export default function userClub(store, action) {
  if(action.type == 'userClub') {
    return store.unshift(action.value);
  } else {
    return store;
  }
}