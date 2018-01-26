export default function updateNotification(store={}, action) {
  if(action.type == 'update') {
    return action.value;
  } else {
    return store;
  }
}