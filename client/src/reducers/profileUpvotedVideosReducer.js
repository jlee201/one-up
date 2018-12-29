import { FETCH_PROFILE_UPVOTED_VIDEOS } from '../actions/types';

export default function(state = [], action) {
	switch(action.type) {
		case FETCH_PROFILE_UPVOTED_VIDEOS:
			return action.payload;
		default: 
			return state;
	}
}