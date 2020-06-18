import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      result: [],
    };
  }
  handleChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  handleSubmit = () => {
    const accessToken = this.props.accessToken;
    axios({
      method: "get",
      url: `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.state.query}&key=AIzaSyCnFD1-P2y8OPAeVFCF-ZQhTQgGjehtSFk`,
      headers: {
        Authorization: accessToken,
      },
    })
      .then((res) => {
        console.log(res);
        this.setState({
          result: res.data.items,
        });
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };

  render() {
    const result = this.state.result.map((item, key) => {
      var frame = (
        <div key={key}>
          <iframe
            title={key}
            src={"https://youtube.com/embed/" + item.id.videoId}
          ></iframe>
        </div>
      );
      return frame;
    });
    return (
      <div>
        <h1>Hello from search</h1>
        <input onChange={this.handleChange} value={this.state.query}></input>
        <button onClick={this.handleSubmit}>Search</button>
        {result}
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
