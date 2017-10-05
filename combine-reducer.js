import { combineReducers } from 'redux';

import user from './user-reducer';
import userClub from './userClub-reducer';

export default combineReducers({user, userClub});