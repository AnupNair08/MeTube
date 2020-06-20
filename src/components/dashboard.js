import React, { Component } from "react";
import { connect } from "react-redux";
import Trending from "./Trending";
import Search from "./Search";
import "./trending.css";
import { Navbar, Card, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import * as firebase from "firebase";
import "./dashboard.scss";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: this.props.login,
      rightOpen: true,
      leftOpen: true,
    };
  }
  componentDidMount = () => {
    this.setState({
      login: this.props.login,
    });
  };

  toggleSidebar = (event) => {
    let key = `${event.currentTarget.parentNode.id}open`;
    this.setState({ [key]: !this.state[key] });
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
    let leftOpen = this.state.leftOpen ? "open" : "closed";
    let rightOpen = this.state.rightOpen ? "open" : "closed";
    const ele = (
      <div>
        <Navbar sticky="top" bg="dark" variant="dark">
          <Navbar.Brand href="#home">UTube</Navbar.Brand>
          <Button variant="outline-success" onClick={this.logout}>
            Logout
          </Button>
        </Navbar>

        <div id="layout">
          <div id="left" className={leftOpen}>
            <div className="icon" onClick={this.toggleSidebar}>
              &equiv;
            </div>
            <div className={`sidebar ${leftOpen}`}>
              <div className="header">
                <h3 className="title">Search bar</h3>
              </div>
              <div className="content">
                <Search></Search>
              </div>
            </div>
          </div>

          <div id="main">
            <div className="header">
              <h3
                className={`
                      title
                      ${"left-" + leftOpen}
                      ${"right-" + rightOpen}
                  `}
              >
                Theatre
              </h3>
            </div>
            <div className="content">
              <div>
                <h3>
                  Welcome to this not so great YouTube clone where you dont have
                  AI suggested stupid videos. Plan what you what you want to
                  watch
                </h3>
              </div>
              <iframe
                className="main"
                height={"400px"}
                width={"640px"}
                title="Screen"
                id="screen"
                allowFullScreen={true}
              ></iframe>
            </div>
          </div>

          <div id="right" className={rightOpen}>
            <div className="icon" onClick={this.toggleSidebar}>
              &equiv;
            </div>
            <div className={`sidebar ${rightOpen}`}>
              <div className="header">
                <h3 className="title">Trending videos</h3>
              </div>
              <div className="content" id="contentT">
                <Trending />
              </div>
            </div>
          </div>
        </div>
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
