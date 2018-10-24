import { combineReducers } from 'redux';

import user from './user-reducer';
import userClub from './userClub-reducer';
import userPreferences from './userPreferences-reducer';
import button from './button-reducer';
import viewProfile from './viewProfile-reducer';
import chat from './chat-reducer';
import game from './game-reducer';
import updateNotification from './updateNotification-reducer';
import searchPlayer from './searchPlayer-reducer';
import reservationOption from './reservationOption-reducer';
import reservationView from './reservationView-reducer';
import window from './window-reducer';

export default combineReducers({
	user, 
	userClub, 
	userPreferences, 
	button, 
	viewProfile, 
	chat, 
	game, 
	updateNotification, 
	searchPlayer, 
	reservationOption, 
	reservationView,
	window
});