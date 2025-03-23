// Import axios, a popular library for making HTTP requests in JavaScript
import axios from "axios";

// Define the base URL for the JSONPlaceholder API, a mock REST API for testing
// This URL points to the todos endpoint, which manages todo items
const API_URL = "https://jsonplaceholder.typicode.com/todos";

// Function to fetch the list of todos from the API
export const getList = async () => {
  try {
    // Make an asynchronous GET request to the API_URL to retrieve all todos
    // axios.get returns a promise that resolves with the response object
    const res = await axios.get(API_URL);
    
    // Note: The commented console.log could be used for debugging to inspect the response data
    //console.log(response.data);
    
    // Return the data from the response, which is an array of todo objects
    // Each todo object typically has properties like id, title, completed, and userId
    return res.data;
  } catch (error) {
    // Log any errors that occur during the request (e.g., network issues, server errors)
    console.log(error);
    
    // Note: No explicit return value on error; function returns undefined by default
    // This could be improved by throwing the error or returning a fallback value
  }
};

// Function to save a new todo item to the API
export const saveTodo = async (obj) => {
  try {
    // Make an asynchronous POST request to the API_URL with the todo object as the request body
    // obj is expected to be a todo object (e.g., { title, completed, userId, renderKey })
    const res = await axios.post(API_URL, obj);
    
    // Note: The commented console.log could be used to debug the response data
    //console.log("ser", res.data);
    
    // Return the data from the response, which is the newly created todo object
    // JSONPlaceholder echoes back the sent object with an added id (typically 201)
    return res.data;
  } catch (err) {
    // Return the error object if the request fails (e.g., network error, invalid data)
    // This allows the caller to handle the error, but it’s unconventional to return err directly
    // A better approach might be to throw the error or return a custom error object
    return err;
  }
};

// Function to update an existing todo by its ID
export const updateTodos = async (id, obj) => {
  try {
    // Make an asynchronous PUT request to the API_URL with the specific todo’s ID
    // The URL is constructed by appending the id to the base API_URL (e.g., /todos/1)
    // obj contains the updated fields (e.g., { title, completed })
    const res = await axios.put(`${API_URL}/${id}`, obj);
    
    // Note: The commented console.log could be used to debug the response data
    //console.log("ser", res.data);
    
    // Return the data from the response, which is the updated todo object
    // JSONPlaceholder echoes back the sent object with the specified id
    return res.data;
  } catch (err) {
    // Return the error object if the request fails (e.g., network error, invalid id)
    // Similar to saveTodo, returning err directly is unconventional; consider throwing it instead
    return err;
  }
};

// Function to delete a todo by its ID
export const deleteTodo = async (id) => {
  try {
    // Make an asynchronous DELETE request to the API_URL with the specific todo’s ID
    // The URL is constructed by appending the id to the base API_URL (e.g., /todos/1)
    const res = await axios.delete(`${API_URL}/${id}`);
    
    // Note: The commented console.log could be used to debug the response data
    //console.log("ser", res.data);
    
    // Return the data from the response, which is typically an empty object ({}) for DELETE
    // JSONPlaceholder confirms deletion with a 200 status and empty data
    return res.data;
  } catch (err) {
    // Return the error object if the request fails (e.g., network error, invalid id)
    // Consistent with other functions, returning err directly could be improved
    return err;
  }
};