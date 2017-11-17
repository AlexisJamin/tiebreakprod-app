export default function userClub(store=[], action) {
  if(action.type == 'userClub') {
  	var copyStore = store.concat();
  	copyStore.unshift(action.value);
    return copyStore;
  } else {
    return store;
  }
}