import { combineReducers } from 'redux';
import userLikes from './reducers/reducers';
import user from './user/user';
export default combineReducers({
  userLikes,
  user,
});
