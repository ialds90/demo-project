import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { tasks, setTasks } = useContext(AppContext);
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

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
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((tasks, index) => (
          <li key={index}>{tasks}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
