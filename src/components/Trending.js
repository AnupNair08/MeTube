import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import "./trending.css";
import { Card, Dropdown } from "react-bootstrap";
import "./dashboard.scss";

class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoList: [],
      nextItem: "",
      regionCode: "IN",
    };
  }

  componentDidMount = () => {
    const maxResults = 5;
    const regionCode = this.state.regionCode;
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
    let flag = 0;
    if (pageToken === "region") {
      flag = 1;
      pageToken = "";
    }
    const regionCode = this.state.regionCode;
    axios({
      method: "get",
      url: `http://localhost:5000/utube/trending/?max=20&reg=${regionCode}&pt=${pageToken}`,
    })
      .then((res) => {
        console.log(res);
        if (flag) {
          this.setState({
            videoList: res.data.items,
            nextItem: res.data.nextPageToken,
          });
        } else {
          this.setState({
            videoList: this.state.videoList.concat(res.data.items),
            nextItem: res.data.nextPageToken,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  };

  playVideo = (item) => {
    const url = item.id;
    const stats = item.statistics;
    const snippet = item.snippet;
    const screen = document.getElementById("screen");
    screen.src = "https://youtube.com/embed/" + url + "?autoplay=1";
    const numbers = document.getElementById("view");
    const title = document.getElementById("titlevid");

    numbers.textContent = `Views : ${Math.floor(
      stats.viewCount / 1000
    )}k   Likes : ${Math.floor(
      stats.likeCount / 1000
    )}k  Dislikes : ${Math.floor(stats.dislikeCount / 1000)}k`;
    title.textContent = snippet.title;
  };

  changeRegion = (code) => {
    this.setState({ regionCode: code });
    this.fetchData("region");
  };

  render() {
    const video = this.state.videoList.map((item, key) => {
      var frame = (
        <div key={key}>
          <Card style={{ width: "18rem" }} onClick={() => this.playVideo(item)}>
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
      <div className="tpage">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Select Region
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => this.changeRegion("IN")}>
              India
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.changeRegion("US")}>
              USA
            </Dropdown.Item>
            <Dropdown.Item onClick={() => this.changeRegion("UK")}>
              UK
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
