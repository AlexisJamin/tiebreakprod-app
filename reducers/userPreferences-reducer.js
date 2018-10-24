export default function userPreferences(store={}, action) {
  if(action.type == 'userPreferences') {
    return action.value;
  } else {
    return store;
  }
}