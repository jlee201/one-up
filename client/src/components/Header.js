import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../CSS/header.css';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <li key="1"><Link to="/" style={{fontFamily: "AppleGothic"}}>Home</Link></li>,
          <li key="2"><Link to="/about" style={{fontFamily: "AppleGothic"}}>About</Link></li>,
          <li key="3"><a href="/auth/google"style={{fontFamily: "AppleGothic"}}>Login With Google</a></li>
        ];
      default:
        return [
          <li key="1"><Link to="/" style={{fontFamily: "AppleGothic"}}>Home</Link></li>,
          <li key="2"><Link to="/about" style={{fontFamily: "AppleGothic"}}>About</Link></li>,
          <li key="3"><Link to="/profile" style={{fontFamily: "AppleGothic"}}>Profile</Link></li>,
          <li key="4"><a href="api/logout" style={{fontFamily: "AppleGothic"}}>Logout</a></li>
        ];
    }
  }

  render() {
    return (
      <nav className="black" style={{marginTop: '30px'}}>
        <div className="nav-wrapper">
          <Link to="/" className="left brand-logo">
            <img src={require('../oneup.png')} height='65'/>
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

// state is a reference to index.js within the Reducers folder that combines all reducers
// Typically, the argument supplemented to the mapStateToProps function is the state, but in this
// case we're taking the auth property out of the state.
// In essence, we're returning { auth: state.auth }. Simplified version below.
function mapStateToProps({ auth }) {
  console.log(auth);
  return { auth };
}

export default connect(mapStateToProps)(Header);
