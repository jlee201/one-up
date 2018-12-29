import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../CSS/editProfile.css';

class EditProfile extends Component {
  renderContent() {
    if (this.props.auth == null) {
        return;
    } else if (!this.props.auth) {
        this.props.history.push('/');
    } else {
        return (
          <div className="edit-profile-wrapper">
            <h4>Edit Profile</h4>
            <form encType="multipart/form-data" method="POST" action="/api/edit_profile">
              <h5>Enter New Bio</h5>

              <div className="video-description">
                <input type="text" name="bio" placeholder="Enter Bio Here"/>
              </div>

              <h5>Select New Profile Picture</h5>

              <div className="choose-image">
                <input type="file" name="picture"/>
              </div>

              <div className="cancel-submit">
                <div className="cancel">
                  <Link to="/profile" className="red btn-flat white-text">
                    Cancel
                  </Link>
                </div>

                <div className="submit">
                  <input type="submit" className="teal btn-flat white-text" value="Submit"/>
                </div>
              </div>
            </form>
          </div>
        );
    }
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return { auth };
}

export default connect(mapStateToProps)(EditProfile);
