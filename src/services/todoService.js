import axios from "axios"; // Import axios for making HTTP requests

// Define the base URL for the API
const API_URL = "https://jsonplaceholder.typicode.com/todos";

//Fetch the list of todos from the API
export const getList = async () => {
  try {
    const res = await axios.get(API_URL); // Make a GET request to fetch todos
    //console.log(response.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//Save new todo item to the API
export const saveTodo = async (obj) => {
  try {
    const res = await axios.post(API_URL, obj); // Make a POST request to create a new todo
    //console.log("ser", res.data);
    return res.data;
  } catch (err) {
    return err;
  }
};

//Update a todo by ID
export const updateTodo = async (id, obj) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, obj); // Make a PUT request to update the todo
    //console.log("ser", res.data);
    return res.data;
  } catch (err) {
    return err;
  }
};

//Delete a todo by ID
export const deleteTodo = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`); // Make a DELETE request to remove the todo
    //console.log("ser", res.data);
    return res.data;
  } catch (err) {
    return err;
  }
};
