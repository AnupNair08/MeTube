import React, { Component } from "react";
import { connect } from "react-redux";
import Trending from "./Trending";
import Search from "./Search";
import "./trending.css";
import { Redirect } from "react-router-dom";

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
    this.setState({
      login: false,
    });
    this.props.login(false);
  };
  render() {
    const ele = (
      <div className="dash">
        <Search />
        <div>
          <h1>Welcome</h1>
        </div>
        <button onClick={this.logout}>Logout</button>
        <iframe
          className="main"
          height={"400px"}
          width={"640px"}
          title="Screen"
          id="screen"
          allowFullScreen={true}
        ></iframe>
        <div className="trending">
          <Trending />
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
