import React, { useContext,useState } from "react";
import { AppContext } from "../context/AppContext";

const About = () => { 
  const { tasks, setTasks } = useContext(AppContext);


  return (
    <div>
      <h1>About Page</h1>
      <ul>
        {tasks.map((tasks, index) => (
          <li key={index}>{tasks}</li>
        ))}
      </ul>
    </div>
  );
};

export default About;
