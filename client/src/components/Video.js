import React, { Component } from 'react';
import '../CSS/video.css';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Video extends Component {
  constructor(props) {
    super(props);

    this.upvoteHandler = this.upvoteHandler.bind(this);
    this.downvoteHandler = this.downvoteHandler.bind(this);
  }

  upvoteHandler() {
    this.props.upvoteVideo(this.props.id);
  }

  downvoteHandler() {
    this.props.downvoteVideo(this.props.id);
  }

  render() {
    return (
      <div className="wrapper">

        <div className="video-wrapper">
          <div className="rank">
            <h4>{this.props.rank}</h4>
          </div>

          <div className="video-player">
            <video
              src={this.props.src}
              width="275"
              height="150"
              controls>
            </video>
          </div>

          <div className="description">
            <p>
              {this.props.description} <br />
              By: {this.props.postedBy} <br />
              Posted: {this.props.postedDate}
            </p>
          </div>

          <div className="votes">
            <div className="btn-small black" id="upvote">
              <i className="material-icons" onClick={this.upvoteHandler}>expand_less</i>
            </div>

            <div className="vote-count">
              <center><h5>{this.props.upvoteCount}</h5></center>
            </div>

            <div className="btn-small black" id="downvote">
              <i className="material-icons" onClick={this.downvoteHandler}>expand_more</i>
            </div>
          </div>
        </div>

        <hr />
      </div>
    );
  }
}

export default connect(null, actions)(Video);
