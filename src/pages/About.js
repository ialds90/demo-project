import { useSelector } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

const About = () => { 
  const todo = useSelector((state) => state.todos); // Access todos from Redux global state


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
                    <th>ID</th>
                    <th>Title</th>
                    <th>User ID</th>
                  </tr>
                </thead>
                <tbody>
                  {(todo || []).map((tsk) => (
                    <tr key={tsk.renderKey}>
                      <td>{tsk.id}</td>
                      <td>{tsk.title}</td>
                      <td>{tsk.userId}</td>
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
