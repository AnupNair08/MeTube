import React, { Component } from "react";
import { connect } from "react-redux";
import Trending from "./Trending";
import Search from "./Search";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to Dashboard</h1>
        <h3>{this.props.user}</h3>
        <Search />
        <div className="trending">
          <h1>Trending Videos</h1>
          <Trending />
        </div>
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

export default connect(mapStatetoProps)(Dashboard);
