import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoList: [],
      nextItem: "",
    };
  }

  componentDidMount = () => {
    const countryCode = "US";
    const maxResults = 20;
    const accessToken = "Bearer " + this.props.accessToken;
    axios({
      method: "get",
      url: `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=${maxResults}&regionCode=${countryCode}&key=AIzaSyCnFD1-P2y8OPAeVFCF-ZQhTQgGjehtSFk`,
      headers: {
        Authorization: accessToken,
      },
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
    const countryCode = "US";
    const accessToken = "Bearer " + this.props.accessToken;
    axios({
      method: "get",
      url: `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=${20}&pageToken=${pageToken}&regionCode=${countryCode}&key=AIzaSyCnFD1-P2y8OPAeVFCF-ZQhTQgGjehtSFk`,
      headers: {
        Authorization: accessToken,
      },
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
  render() {
    const video = this.state.videoList.map((item, key) => {
      var frame = (
        <div key={key}>
          <img
            src={item.snippet.thumbnails.high.url}
            height={"200px"}
            width={"280px"}
            alt={item.id}
          ></img>
          {/* <iframe
            title={key}
            src={"https://youtube.com/embed/" + item.id}
          ></iframe> */}
        </div>
      );
      return frame;
    });

    return (
      <div className="trending">
        <InfiniteScroll
          dataLength={this.state.videoList.length}
          hasMore={true}
          next={() => this.fetchData(this.state.nextItem)}
          scrollThreshold={1}
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
