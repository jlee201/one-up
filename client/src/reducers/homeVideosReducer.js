import { FETCH_HOME_VIDEOS } from '../actions/types';

export default function(state = [], action) {
	switch(action.type) {
		case FETCH_HOME_VIDEOS:
			return action.payload;
		default:
			return state;
	}
}