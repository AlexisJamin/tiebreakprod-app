import { combineReducers } from 'redux';

import routeReducer from './route-reducer';
import userReducer from './user-reducer';
import userClubReducer from './user-reducer';

export default combineReducers({
    route: routeReducer,
    user: userReducer,
    userClub: userClubReducer,
});