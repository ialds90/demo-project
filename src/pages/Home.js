import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext"; // Import global state management context
import { getList, saveTodo } from "../services/todoService"; //Import functions for fetching and saving todos

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
    <>
      <Container>
        <Row>
          <Col>
            <div className="container mx-auto p-4 bg-slate-100">
              <h1 className="text-3xl font-bold underline pb-5">Todo App</h1>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Add To Do</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter To Do"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={addTask}>
                Add Task
              </Button>

              <ul>
                {tasks.map((tasks, index) => (
                  <li key={index}>{tasks}</li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
