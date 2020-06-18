import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  handleSubmit = () => {
    const accessToken = this.props.accessToken;
    if (!this.state.query) {
      axios({
        method: "get",
        url: `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.state.query}&key=AIzaSyCnFD1-P2y8OPAeVFCF-ZQhTQgGjehtSFk`,
        headers: {
          Authorization: accessToken,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          return;
        });
    } else {
      return;
    }
  };

  render() {
    console.log(this.state.query);
    return (
      <div>
        <h1>Hello from search</h1>
        <input onChange={this.handleChange} value={this.state.query}></input>
        <button onClick={this.handleSubmit}>Search</button>
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

export default connect(mapStatetoProps)(Search);
