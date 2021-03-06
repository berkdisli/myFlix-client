import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Row,
  Col,
  Navbar,
  Nav,
} from "react-bootstrap";

import "./registration-view.scss";
import "../navbar/navbar.scss";

import axios from "axios";

export function RegisView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://berkdislimyflix.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self");
        alert("Registration is successful");

        // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch((e) => {
        console.log("error registering the user");
        alert("Something went wrong. Please check your data and try again.");
      });
  };

  return (
    <Container className="regis-container">
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title> Registration </Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="Enter a username"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength="8"
                      placeholder="Your password must be at least 8 characters"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBirthday">
                    <Form.Label className="mt-3">Birthday</Form.Label>
                    <Form.Control
                      className="mb-3"
                      type="date"
                      onChange={(e) => setBirthday(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address"
                    />
                  </Form.Group>

                  <Button
                    className="register-button"
                    variant="info"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Register
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegisView.propTypes = {
  registeration: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
  onRegistration: PropTypes.func,
};
