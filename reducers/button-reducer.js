export default function buttonIndex(store={}, action) {
  if(action.type == 'button') {
    return action.value;
  } else {
    return store;
  }
}