import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./trending.css";
import { Card, InputGroup, Button, FormControl } from "react-bootstrap";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      result: [],
      nextItem: "",
    };
  }
  handleChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  playVideo = (url) => {
    const screen = document.getElementById("screen");
    screen.src = "https://youtube.com/embed/" + url + "?autoplay=1";
    window.scrollTo(0, 0);
    return;
  };

  handleSubmit = () => {
    axios({
      method: "get",
      url: `http://localhost:5000/utube/search/?q=${this.state.query}`,
    })
      .then((res) => {
        console.log(res);
        this.setState({
          result: res.data.items,
          nextItem: res.data.nextPageToken,
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
          <Card
            style={{ width: "18rem" }}
            onClick={() => this.playVideo(item.id.videoId)}
          >
            <Card.Img variant="top" src={item.snippet.thumbnails.high.url} />
            <Card.Body>
              <Card.Title>{item.snippet.title}</Card.Title>
              <Card.Text>{item.snippet.channelTitle}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
      return frame;
    });
    return (
      <div className="search">
        <div className="searchBar">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search for some video"
              aria-label="Search for some video"
              aria-describedby="basic-addon2"
              onChange={this.handleChange}
              value={this.state.query}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={this.handleSubmit}>
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>

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
