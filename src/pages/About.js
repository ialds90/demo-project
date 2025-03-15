import React, { useContext,useState } from "react";
import { AppContext } from "../context/AppContext";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

const About = () => { 
  const { tasks, setTasks } = useContext(AppContext);


  return (
    <Container>
          <Row>
            <Col>
              <h1>About Page</h1>
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
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((tasks, index) => (
                    <tr key={tasks.id}>
                      <td>{index + 1}</td>
                      <td>{tasks.id}</td>
                      <td>{tasks.title}</td>
                      <td>{tasks.userId}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
    </Container>
  );
};

export default About;
