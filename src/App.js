import React, { Component } from "react";
import "./App.css";
import Firebase from "./components/auth";
import { connect } from "react-redux";
import Dashboard from "./components/dashboard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello</h1>
        <Firebase></Firebase>
        {this.props.login ? <Dashboard /> : <h1>Not Logged in</h1>}
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

export default connect(mapStatetoProps)(App);
