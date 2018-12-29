import { FETCH_USER } from '../actions/types';

// set state to null so we indicate that we're not sure what's going on. 
// e.g. don't want to have 'Login with Google' show up when we're trying to figure out   
// the state and the user ends up being logged in
export default function(state = null, action) {
  switch(action.type) {
    case FETCH_USER:
      // Payload with either be an object that represents the user's data. 
      // Or the payload will be an empty string that represents the user being logged out. 
      // '' || false = false
      return action.payload || false;
    default: 
      return state;
  }
}