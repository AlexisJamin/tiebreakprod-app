export default function userClub(store=[], action) {
  if(action.type == 'userClub') {
  	store.unshift(action.value);
    return store;
  } else {
    return store;
  }
}