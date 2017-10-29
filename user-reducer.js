export default function user(store={}, action) {
  if(action.type == 'user') {
    return action.value;
  } else {
    return store;
  }
}