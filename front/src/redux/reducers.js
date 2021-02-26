import { combineReducers } from 'redux';
import userLikes from './reducers/userLikes';
import user from './user/user';
export default combineReducers({
  userLikes,
  user,
});
