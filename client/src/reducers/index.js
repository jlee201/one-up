import { combineReducers } from 'redux';
import authReducer from './authReducer';
import homeVideosReducer from './homeVideosReducer';
import profileUploadedVideosReducer from './profileUploadedVideosReducer';
import profileUpvotedVideosReducer from './profileUpvotedVideosReducer';

export default combineReducers({
  auth: authReducer,
  homeVideos: homeVideosReducer,
  profileUploadedVideos: profileUploadedVideosReducer,
  profileUpvotedVideos: profileUpvotedVideosReducer
});