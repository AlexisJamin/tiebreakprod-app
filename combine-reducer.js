import { combineReducers } from 'redux';

import route from './route-reducer';
import user from './user-reducer';
import userClub from './userClub-reducer';

export default combineReducers({user, userClub, route});