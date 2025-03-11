import React, { useState } from "react";

const Home = () => {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  const addTask = () => {
    setList([...list, task]);
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
        {list.map((list, index) => (
          <li key={index}>{list}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
