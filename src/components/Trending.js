import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import "./trending.css";
import { Card } from "react-bootstrap";
import "./dashboard.scss";

class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoList: [],
      nextItem: "",
    };
  }

  componentDidMount = () => {
    const maxResults = 5;
    const regionCode = "US";
    axios({
      method: "get",
      url: `http://localhost:5000/utube/trending/?max=${maxResults}&reg=${regionCode}`,
    })
      .then((res) => {
        console.log(res);
        this.setState({
          videoList: res.data.items,
          nextItem: res.data.nextPageToken,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fetchData = (pageToken) => {
    const regionCode = "US";
    axios({
      method: "get",
      url: `http://localhost:5000/utube/trending/?max=20&reg=${regionCode}&pt=${pageToken}`,
    })
      .then((res) => {
        console.log(res);
        this.setState({
          videoList: this.state.videoList.concat(res.data.items),
          nextItem: res.data.nextPageToken,
        });
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };

  playVideo = (url) => {
    const screen = document.getElementById("screen");
    screen.src = "https://youtube.com/embed/" + url + "?autoplay=1";
  };
  render() {
    const video = this.state.videoList.map((item, key) => {
      var frame = (
        <div key={key}>
          <Card
            style={{ width: "18rem" }}
            onClick={() => this.playVideo(item.id)}
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
      <div>
        <InfiniteScroll
          dataLength={this.state.videoList.length}
          hasMore={true}
          next={() => this.fetchData(this.state.nextItem)}
          scrollableTarget={"contentT"}
        />
        {video}
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

export default connect(mapStatetoProps)(Trending);
