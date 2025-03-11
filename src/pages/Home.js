import React, { useState } from "react";

const Home = () => {
  const [task, setTask] = useState;

  const addTask = () => {
    console.log(task);
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
    </div>
  );
};

export default Home;
