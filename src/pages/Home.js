import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext"; // Import global state management context
import { getList, saveTodo } from "../services/todoService"; //Import functions for fetching and saving todos

const Home = () => {
  // Access the global tasks state and its updater function from context
  const { tasks, setTasks } = useContext(AppContext);

  // Local state to store the new task input
  const [task, setTask] = useState("");

  // Local state to store the fetched task list from the API
  const [list, setList] = useState([]);

  // Fetch the list of tasks when the component mounts
  useEffect(() => {
    const getData = async () => {
      const res = await getList(); // Fetch tasks from API
      setList(res); // Update local state with fetched tasks
      console.log(res);
    };
    getData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Function to add a new task to the global state
  const addTask = () => {
    setTasks([...tasks, task]); // Update global state with the new task

    setTask(""); // Clear the input field after adding the task
  };

  return (
    <div className="container mx-auto p-4 bg-slate-100">
      <h1 className="text-3xl font-bold underline pb-5">Todo App</h1>
      <input
        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-offset-2 focus-within:outline-indigo-600"
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        className="block px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        onClick={addTask}
      >
        Add Task
      </button>
      <ul>
        {tasks.map((tasks, index) => (
          <li key={index}>{tasks}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
