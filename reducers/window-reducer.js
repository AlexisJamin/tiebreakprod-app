export default function window(store={}, action) {
  if(action.type == 'window') {
    return action.value;
  } else {
    return store;
  }
}