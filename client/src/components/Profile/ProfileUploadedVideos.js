import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../CSS/profile/profileUploadedVideos.css';

import ProfileVideo from './ProfileVideo';

class ProfileUploadedVideos extends Component {
  renderUploadedVideosSection() {
    if (this.props.profileUploadedVideos.length === 0) {
        return (
          <p>You have no uploaded videos at the moment.</p>
        );
    } else {
        return (
          <div className="scrolling-uploaded-wrapper">
            {this.renderUploadedVideos()}
          </div>
        );
    }
  }

  renderUploadedVideos() {
    return this.props.profileUploadedVideos.map(video => {
      return (
          <div className="video" key={video._id}>
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
      <div className="profile-uploaded-videos-wrapper">
        <h4>Uploaded Videos</h4>
        {this.renderUploadedVideosSection()}
      </div>
    );
  }
}

function mapStateToProps({ profileUploadedVideos }) {
  return { profileUploadedVideos };
}

export default connect(mapStateToProps)(ProfileUploadedVideos);
