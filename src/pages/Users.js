import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

// Import Bootstrap components for UI layout
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

const Users = () => {

  const [name, setName] = useState('');
  const users = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addUsers = () => {
    if (!name.trim()) return;
    dispatch(addUser({ id: Date.now(), name: name }));
    setName("");
  };

  return (
    <Container>
    <div>
      <h1>Users</h1>
      <Form>
                <Form.Group className="mb-3">
                  <Form.Label>User Name</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Enter User Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Button variant="primary" onClick={addUsers}>
                      Add User
                    </Button>
                  </InputGroup>
                </Form.Group>
              </Form>
    </div>
    </Container>
  );
};

export default Users;
