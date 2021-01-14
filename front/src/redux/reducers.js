import { combineReducers } from 'redux';
import userLikes from './reducers/userLikes';
import isAuth from "./reducers/user"
export default combineReducers({
    userLikes,
    isAuth
});
