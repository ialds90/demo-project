import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

import { getList, saveTodo } from "../services/todoService";

const Home = () => {
  const { tasks, setTasks } = useContext(AppContext);
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await getList();
      setList(res);
      console.log(res);
    };
    getData();
  }, []);

  const addTask = () => {
    setTasks([...tasks, task]);

    setTask("");
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
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
