export default function userClub(store=[], action) {
  if (action.type == 'userClub') {
  	var copyStore = store.concat();
  	copyStore.push(action.value);
    return copyStore;
  } 
  if (action.type == 'newUserClub') {
  	return store = [action.value];
  }
  else {
    return store;
  }
}