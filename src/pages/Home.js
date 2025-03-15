import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext"; // Import global context for state management

import {
  getList,
  saveTodo,
  updateTodo,
  deleteTodo,
} from "../services/todoService"; // Import API functions for CRUD operations

// Import Bootstrap components for UI layout
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Spinner from "react-bootstrap/Spinner";

const Home = () => {
  // Access global context for tasks
  const { tasks, setTasks } = useContext(AppContext);

  // Local state variables
  const [task, setTask] = useState(""); // Holds the current task input
  const [list, setList] = useState([]); // Stores the list of tasks
  const [load, setLoad] = useState(false); // Loading state for fetching data
  const [editId, setEditId] = useState(""); // Stores the ID of the task being edited
  const [btnText, setBtnText] = useState("Add Task"); // Button text toggles between "Add Task" & "Update Task"
  const [isEdit, setIsEdit] = useState(false); // Flag to check if edit mode is active

  // Fetch task list when component mounts
  useEffect(() => {
    setLoad(true);
    const getData = async () => {
      try {
        const data = await getList(); // Fetch tasks from API
        setList(data); // Set tasks to state
        setLoad(false);
      } catch (error) {
        console.error("Error getting data:", error);
        setList([]);
      }
    };
    getData();
  }, []);

  // Function to add a new task or updates an existing one
  const addTask = async () => {
    if (!task.trim()) return; // Prevent empty tasks
    const obj = { title: task, completed: false, userId: 5 }; // Create task object
    try {
      if (isEdit) {
        // If in edit mode, update the existing task
        const updatedTask = await updateTodo(editId, obj);
        if (updatedTask && updatedTask.id) {
          setList(
            list.map((updateTask) =>
              updateTask.id === editId ? updatedTask : updateTask
            )
          );
          setIsEdit(false);
          setBtnText("Add Task");
          setEditId("");
        }
      } else {
        // If not in edit mode,, save a new task
        const newTask = await saveTodo(obj);
        if (newTask && newTask.id) {
          setList([...list, newTask]);
        }
      }
    } catch (error) {
      console.error("Error in adding new Task: ", error);
    }
    setTask(""); // Clear input field after adding task
  };

  //Set task in the input field for editing
  const editTask = (id, title) => {
    setBtnText("Update Task");
    setIsEdit(true);
    setEditId(id);
    setTask(title);
  };

  //Delete a task by id
  const deleteTask = async (id) => {
    try {
      await deleteTodo(id);
      setList(list.filter((deleteTask) => deleteTask.id !== id));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  return (
    <Container>
      {load ? (
        <Row>
          <Col>
            <Spinner animation="border" variant="info" />
          </Col>
        </Row>
      ) : (
        <>
          <Row>
            <Col>
              <h1>Todo App</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Add To Do</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Enter To Do"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                  />
                  <Button variant="primary" onClick={addTask}>
                    {btnText}
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>User ID</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((tsk, index) => (
                    <tr key={tsk.id}>
                      <td>{index + 1}</td>
                      <td>{tsk.id}</td>
                      <td>{tsk.title}</td>
                      <td>{tsk.userId}</td>
                      <td>
                        <ButtonGroup>
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => editTask(tsk.id, tsk.title)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => deleteTask(tsk.id)}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Home;
