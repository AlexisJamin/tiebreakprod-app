export default function searchPlayer(store={}, action) {
  if(action.type == 'searchPlayer') {
    return action.value;
  } else {
    return store;
  }
}