// Import React and hooks for state management and side effects
import React, { useState, useEffect } from "react";

// Import Redux hooks to access and modify the global state
import { useSelector, useDispatch } from "react-redux";

// Import action creators from the todoSlice for Redux state management
import { setTodos, addTodo, updateTodo, removeTodo } from "../store/todoSlice";

// Import uuid library to generate unique identifiers
import { v4 as uuidv4 } from "uuid";

// Import CRUD API functions from todoService
import {
  getList, // Fetches the list of todos from the API
  saveTodo, // Saves a new todo to the API
  updateTodos, // Updates an existing todo via the API
  deleteTodo, // Deletes a todo from the API
} from "../services/todoService";

// Import Bootstrap components for styling and layout
import Container from "react-bootstrap/Container"; // Main wrapper for content
import Row from "react-bootstrap/Row"; // Grid row for layout
import Col from "react-bootstrap/Col"; // Grid column for layout
import Form from "react-bootstrap/Form"; // Form component for input
import Button from "react-bootstrap/Button"; // Button component
import Table from "react-bootstrap/Table"; // Table for displaying todos
import InputGroup from "react-bootstrap/InputGroup"; // Input group for form styling
import ButtonGroup from "react-bootstrap/ButtonGroup"; // Group for action buttons
import Spinner from "react-bootstrap/Spinner"; // Loading spinner

// Define the Home component
const Home = () => {
  // Local state variables using the useState hook
  const [task, setTask] = useState(""); // Holds the current input value for a new or edited task
  const [list, setList] = useState([]); // Local state for todos
  const [load, setLoad] = useState(false); // Boolean to show/hide loading spinner during API calls
  const [editId, setEditId] = useState(""); // Stores the ID of the todo being edited
  const [btnText, setBtnText] = useState("Add Task"); // Toggles button text between "Add Task" and "Update Task"
  const [isEdit, setIsEdit] = useState(false); // Flag to indicate if the app is in edit mode
  const [editRenderKey, setEditRenderKey] = useState(""); // Stores the renderKey of the todo being edited

  // Access the todos array from the Redux store
  const todo = useSelector((state) => state.todos);

  // Get the dispatch function to send actions to the Redux store
  const dispatch = useDispatch();

  // useEffect hook to fetch todos when the component mounts
  useEffect(() => {
    setLoad(true); // Show loading spinner while fetching data
    const getData = async () => {
      try {
        const data = await getList(); // Fetch todos from the API
        // Map over fetched data to add a unique renderKey to each todo for React rendering
        const newTask = data.map((tsk) => ({ ...tsk, renderKey: uuidv4() }));
        dispatch(setTodos(newTask)); // Update Redux store with the fetched todos
        setLoad(false); // Hide loading spinner after successful fetch
      } catch (error) {
        console.error("Error getting data:", error); // Log any fetch errors
        setList([]); // Reset unused local list state on error
      }
    };
    getData(); // Execute the async fetch function
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to add a new task or update an existing one
  const addTask = async () => {
    if (!task.trim()) return; // Exit if the task input is empty or only whitespace
    // Base object for a todo with title, completion status, and user ID
    const obj = { title: task, completed: false, userId: 5 };
    try {
      if (isEdit) {
        // If in edit mode, update the existing task
        const updatedTask = await updateTodos(editId, obj); // Send update request to API with editId
        if (updatedTask && updatedTask.id) {
          // Check if the response is valid
          // Dispatch action to update the todo in Redux store, preserving renderKey
          dispatch(updateTodo({ ...updatedTask, renderKey: editRenderKey }));
          setIsEdit(false); // Exit edit mode
          setBtnText("Add Task"); // Reset button text to "Add Task"
          setEditId(""); // Clear the edit ID
          setEditRenderKey(""); // Clear the edit renderKey
        }
      } else {
        // If not in edit mode, add a new task
        const renderKey = uuidv4(); // Generate a unique renderKey for the new todo
        // Create a new todo object with additional fields: createdAt and renderKey
        const newObj = {
          ...obj,
          createdAt: new Date().toISOString(), // Add timestamp for sorting
          renderKey,
        };
        const newTask = await saveTodo(newObj); // Send new todo to API
        if (newTask && newTask.id) {
          // Check if the response is valid
          dispatch(addTodo(newTask)); // Add the new todo to Redux store with API-assigned ID
          console.log("New Task Added: ", newTask); // Log the new task for debugging
        }
      }
    } catch (error) {
      console.error("Error in adding new Task: ", error); // Log any errors during add/update
    }
    setTask(""); // Clear the input field after adding or updating
  };

  // Function to set up the form for editing a task
  const editTask = (renderKey, id, title) => {
    setBtnText("Update Task"); // Change button text to indicate update mode
    setIsEdit(true); // Enter edit mode
    setEditId(id); // Store the ID of the task being edited
    setEditRenderKey(renderKey); // Store the renderKey for updating the correct todo
    setTask(title); // Populate the input field with the task’s current title
  };

  // Function to delete a task
  const deleteTask = async (rkey, id) => {
    try {
      await deleteTodo(id); // Send delete request to API using the todo’s ID
      dispatch(removeTodo(rkey)); // Remove the todo from Redux store using its renderKey
    } catch (error) {
      console.error("Error deleting task: ", error); // Log any errors during deletion
    }
  };

  // Render the UI
  return (
    <Container>
      {/* Show loading spinner if data is being fetched */}
      {load ? (
        <Row>
          <Col>
            <Spinner animation="border" variant="info" />
            {/* Loading indicator */}
          </Col>
        </Row>
      ) : (
        <>
          {/* Header row */}
          <Row>
            <Col>
              <h1>Todo App</h1> {/* App title */}
            </Col>
          </Row>
          {/* Form row for adding/updating todos */}
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Add To Do</Form.Label> {/* Form label */}
                  <InputGroup>
                    {/* Input field for task title */}
                    <Form.Control
                      type="text"
                      placeholder="Enter To Do"
                      value={task} // Controlled input bound to task state
                      onChange={(e) => setTask(e.target.value)} // Update task state on input change
                    />
                    {/* Button to add or update the task */}
                    <Button variant="primary" onClick={addTask}>
                      {btnText}
                      {/* Dynamically shows "Add Task" or "Update Task" */}
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>User ID</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Render todos from Redux store, sorted by ID and createdAt */}
                  {(todo || [])// Fallback to empty array if todo is undefined
                    .slice()// Create a copy to avoid mutating the original array
                    .sort((a, b) => {
                      if (b.id - a.id !== 0) {
                        return b.id - a.id;// Sort by ID in descending order (higher IDs first)
                      }
                      const aCreatedAt = a.createdAt || "0";// Default to "0" if createdAt is missing
                      const bCreatedAt = b.createdAt || "0";// Default to "0" if createdAt is missing
                      // Sort by createdAt in descending order for todos with same ID
                      return bCreatedAt.localeCompare(aCreatedAt);
                    })
                    .map((tsk) => (
                      <tr key={tsk.renderKey}>
                        {/* Unique key for each row using renderKey */}
                        <td>{tsk.id}</td>
                        <td>{tsk.title}</td>
                        <td>{tsk.userId}</td>
                        <td>
                          <ButtonGroup>
                            {/* Group for action buttons */}
                            {/* Edit button to trigger editTask */}
                            <Button
                              variant="warning"
                              size="sm"
                              onClick={() =>
                                editTask(tsk.renderKey, tsk.id, tsk.title)
                              }
                            >Edit
                            </Button>
                            {/* Delete button to trigger deleteTask */}
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => deleteTask(tsk.renderKey, tsk.id)}
                            >Delete
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

// Export the Home component as the default export
export default Home;
