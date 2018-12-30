import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// connect allows the component to connect with either actions or reducers depending
// on the argument that is supplied to the function
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Home from './Home';
import About from './About';
import Profile from './Profile/Profile';
import Upload from './Upload';
import EditProfile from './EditProfile';


// BrowserRouter expects one child, must wrap routes in a div
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchHomeVideos();
    this.props.fetchProfileVideos();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route exact path="/profile" component={Profile}/>
            <Route path="/profile/upload" component={Upload}/>
            <Route path="/profile/edit" component={EditProfile}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default connect(null, actions)(App);
