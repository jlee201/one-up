import React, { Component } from 'react';
import '../../CSS/profile/profileVideo.css';

class ProfileVideo extends Component {
  render() {
    return (
      <div className="profile-video-wrapper">
        <div className="vid">
          <video
            src={this.props.src}
            width="250"
            height="150"
            controls>
          </video>

          <div className="video-meta-data">
            <p>
              {this.props.description} <br />
              By: {this.props.postedBy} <br />
              Posted: {this.props.postedDate}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileVideo;
