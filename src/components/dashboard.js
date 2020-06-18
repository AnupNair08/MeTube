import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subscriptions: {},
    };
  }

  componentDidMount = () => {
    const accessToken = "Bearer " + this.props.accessToken;
    axios({
      method: "get",
      url:
        "https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&maxResults=15&mine=true&key=AIzaSyCnFD1-P2y8OPAeVFCF-ZQhTQgGjehtSFk",
      headers: {
        Authorization: accessToken,
      },
    })
      .then((res) => {
        console.log(res);
        this.setState({
          subscriptions: res.data.items,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <h1>Welcome to Dashboard</h1>
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
