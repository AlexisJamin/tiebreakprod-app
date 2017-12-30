export default function chat(store={}, action) {
  if(action.type == 'chat') {
    return action.value;
  } else {
    return store;
  }
}