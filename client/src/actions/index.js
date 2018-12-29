import axios from 'axios';
import { FETCH_USER, FETCH_HOME_VIDEOS,
	FETCH_PROFILE_UPLOADED_VIDEOS, FETCH_PROFILE_UPVOTED_VIDEOS } from './types';

// Redux Thunk will see that we have passed in a function instead of an action.
// It will automatically call the function and pass in the dispatch function as an argument.
// We use Redux Thunk because of our inability to immediatley return an action. We return a promise first.
export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchHomeVideos = () => async dispatch => {
	const res = await axios.get('/api/videos_home');
	dispatch({ type: FETCH_HOME_VIDEOS, payload: res.data });
};

export const fetchProfileVideos = () => async dispatch => {
	const res = await axios.get('/api/videos_profile');
	dispatch({ type: FETCH_PROFILE_UPLOADED_VIDEOS, payload: res.data.uploadedVideos });
	dispatch({ type: FETCH_PROFILE_UPVOTED_VIDEOS, payload: res.data.upvotedVideos });
}

export const upvoteVideo = (videoId) => async dispatch => {
	const res = await axios.post('/api/upvote' + videoId);
	dispatch({ type: FETCH_HOME_VIDEOS, payload: res.data.updatedHomeVideos });
	dispatch({ type: FETCH_PROFILE_UPVOTED_VIDEOS, payload: res.data.updatedUpvoteVideos });
}

export const downvoteVideo = (videoId) => async dispatch => {
	const res = await axios.post('/api/downvote' + videoId);
	dispatch({ type: FETCH_HOME_VIDEOS, payload: res.data });
}
