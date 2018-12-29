import React, { Component } from 'react';
import { connect } from 'react-redux';
import Video from './Video';

class Home extends Component {
  renderVideos() {
    var counter = 0;
    return this.props.homeVideos.map(video => {
      counter += 1;
      return (
          <Video
            key={video._id}
            id={video._id}
            rank={counter}
            src={video.src}
            description={video.description}
            postedBy={video.postedBy}
            postedDate={video.postedDate}
            upvoteCount={video.upvoteCount}
          />
      );
    });
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <font style={{color: "white", fontFamily: "AppleGothic"}}>Home</font>
        </div>
        <hr />
        {this.renderVideos()}
      </div>
    );
  }
}

function mapStateToProps({ homeVideos }) {
  return { homeVideos };
}

export default connect(mapStateToProps)(Home);
