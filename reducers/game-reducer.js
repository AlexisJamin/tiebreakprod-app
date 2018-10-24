export default function game(store={}, action) {
  if(action.type == 'game') {
    return action.value;
  } else {
    return store;
  }
}