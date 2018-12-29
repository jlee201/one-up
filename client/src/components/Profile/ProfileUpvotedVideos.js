import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../CSS/profile/profileUpvotedVideos.css';

import ProfileVideo from './ProfileVideo';

class ProfileUpvotedVideos extends Component {
  renderUpvotedVideosSection() {
    if (this.props.profileUpvotedVideos.length === 0) {
        return (
          <p>You have no upvoted videos at the moment.</p>
        );
    } else {
        return (
          <div className="scrolling-upvoted-wrapper">
            {this.renderUpvotedVideos()}
          </div>
        );
    }
  }

  renderUpvotedVideos() {
    return this.props.profileUpvotedVideos.map(video => {
      return (
          <div className="video">
            <ProfileVideo
              key={video._id}
              id={video._id}
              src={video.src}
              description={video.description}
              postedBy={video.postedBy}
              postedDate={video.postedDate}
              upvoteCount={video.upvoteCount}
            />
          </div>
      );
    });
  }

  render() {
    return (
      <div className="profile-upvoted-videos-wrapper">
        <h4>Upvoted Videos</h4>
        {this.renderUpvotedVideosSection()}
      </div>
    );
  }
}

function mapStateToProps({ profileUpvotedVideos }) {
  return { profileUpvotedVideos };
}

export default connect(mapStateToProps)(ProfileUpvotedVideos);
