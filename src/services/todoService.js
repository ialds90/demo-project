import axios from "axios";

// Define the base URL for the API
const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const getList = async () => {
  try {
    const response = await axios.get(API_URL); // Make a GET request to fetch todos
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const saveTodo = () => {
  console.log("saveTodo");
};
