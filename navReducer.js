import { NavigationActions } from 'react-navigation'

import AppNavigator from './App'

export default navReducer = (store, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, store);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};
