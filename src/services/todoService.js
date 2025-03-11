import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const getList = async () => {
  try {
    const response = await axios.get(API_URL);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const saveTodo = () => {
  console.log("saveTodo");
};
