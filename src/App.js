import React, { Component } from "react";
import "./App.css";
import Firebase from "./components/Login";
import { connect } from "react-redux";
import Dashboard from "./components/dashboard";
import { Route, Redirect } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/login" component={Firebase}></Route>
        <Route exact path="/dashboard" component={Dashboard}></Route>
        {this.props.login ? (
          <Redirect
            to={{
              pathname: "/dashboard",
            }}
          />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )}
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
