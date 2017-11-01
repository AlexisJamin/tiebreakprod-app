import { combineReducers } from 'redux';

import user from './user-reducer';
import userClub from './userClub-reducer';
import userPreferences from './userPreferences-reducer';
import button from './button-reducer';

export default combineReducers({user, userClub, userPreferences, button});