import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../CSS/profile/profile.css';

import ProfileUploadedVideos from './ProfileUploadedVideos';
import ProfileUpvotedVideos from './ProfileUpvotedVideos';

class Profile extends Component {
  renderContent() {
    if (this.props.auth == null) {
        return;
    } else if (!this.props.auth) {
        this.props.history.push('/');
    } else {
        return (
          <div className="profile-wrapper">
            <div className="user-info">
              <div className="profile-picture">
                <img className="profile-picture"
                  src={this.props.auth.profilePictureSRC}
                  alt={this.props.auth.profilePictureSRC.default}
                ></img>

                <div className="edit-profile">
                  <Link to="/profile/edit" className="btn-floating btn-small red">
                    <i className="material-icons">edit</i>
                  </Link>
                </div>
              </div>

              <div className="name-bio">
                <h4>{this.props.auth.name}</h4>
                <p>{this.props.auth.bio}</p>
              </div>

              <div className="upload">
                <div className="upload-button">
                  <div className="btn-floating btn-large red" id="upload">
                    <Link to="/profile/upload">
                      <i className="material-icons">add</i>
                    </Link>
                  </div>
                </div>

                <div className="upload-header">
                  <p>UPLOAD</p>
                </div>
              </div>
            </div>

            <hr />

            <ProfileUploadedVideos />

            <ProfileUpvotedVideos />
          </div>
        );
    }
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Profile);
