import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class Trending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoList: [],
      nextPageToken: "",
    };
  }

  componentDidMount = () => {
    const countryCode = "US";
    const maxResults = 10;
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
    const maxResults = 10;
    const accessToken = "Bearer " + this.props.accessToken;
    axios({
      method: "get",
      url: `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=${maxResults}&pageToken=${pageToken}&regionCode=${countryCode}&key=AIzaSyCnFD1-P2y8OPAeVFCF-ZQhTQgGjehtSFk`,
      headers: {
        Authorization: accessToken,
      },
    })
      .then((res) => {
        console.log(res);
        this.setState({
          videoList: res.data.items,
          nextPageToken: res.data.nextpageToken,
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
          <iframe
            title={key}
            src={"https://youtube.com/embed/" + item.id}
          ></iframe>
        </div>
      );
      return frame;
    });

    return <div className="trending">{video}</div>;
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
