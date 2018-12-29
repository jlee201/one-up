import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../CSS/upload.css';

class Upload extends Component {
  renderContent() {
    if (this.props.auth == null) {
        return;
    } else if (!this.props.auth) {
        this.props.history.push('/');
    } else {
        return(
          <div className="upload-form-wrapper">
            <h4>Upload Clip</h4>

            <form encType="multipart/form-data" method="POST" action="/api/upload">
              <h5>Step 1: Give a video description</h5>

              <div className="video-description">
                <input type="text" name="title" placeholder="Enter Description" required/>
              </div>

              <h5>Step 2: Choose a video to upload</h5>

              <div className="choose-video">
                <input type="file" name="video" required/>
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
    return(
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({auth}) {
  return { auth };
}

export default connect(mapStateToProps)(Upload);
