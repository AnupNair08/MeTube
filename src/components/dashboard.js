import React, { Component } from "react";
import { connect } from "react-redux";
import Trending from "./Trending";
import Search from "./Search";
import "./trending.css";
import { Navbar, Container, Row, Col, Card, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import * as firebase from "firebase";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: this.props.login,
    };
  }
  componentDidMount = () => {
    this.setState({
      login: this.props.login,
    });
  };
  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Logged out");
      })
      .catch((err) => console.log(err));
    this.setState({
      login: false,
    });
    this.props.login(false);
  };
  render() {
    const ele = (
      <div>
        <Navbar sticky="top" bg="dark" variant="dark">
          <Navbar.Brand href="#home">UTube</Navbar.Brand>
          <Button variant="outline-success" onClick={this.logout}>
            Logout
          </Button>
        </Navbar>

        <Container fluid>
          <Row>
            <Col lg={true}>
              <Search />
            </Col>
            <Col xs={6}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Welcome</Card.Title>
                  <Card.Text>This is a clutter free YouTube Clone</Card.Text>
                </Card.Body>
              </Card>
              <iframe
                className="main"
                height={"400px"}
                width={"640px"}
                title="Screen"
                id="screen"
                allowFullScreen={true}
              ></iframe>
            </Col>
            <Col lg={true}>
              <div>
                <Trending />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );

    return (
      <div>
        {this.state.login ? ele : <Redirect to={{ pathname: "/login" }} />}
      </div>
    );
  }
}

function mapStatetoProps(state) {
  return {
    user: state.user,
    accessToken: state.accessToken,
    login: state.login,
  };
}
function mapDispatchtoProps(dispatch) {
  return {
    login: (status) => {
      dispatch({ type: "LOGIN", payload: status });
    },
  };
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Dashboard);
