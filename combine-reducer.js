import { combineReducers } from 'redux';

//import nav from './navReducer';
import user from './user-reducer';
import userClub from './userClub-reducer';

export default combineReducers({user, userClub});