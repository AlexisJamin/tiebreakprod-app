export default function userClub(store=[], action) {
  if (action.type == 'signIn') {
    return store=[];
  } 
  if (action.type == 'userClub') {
  	var copyStore = store.concat();
  	copyStore.push(action.value);
    return copyStore;
  } 
  if (action.type == 'newUserClub') {
  	var copyStore = store.concat();
  	copyStore.splice(action.value,1);
    return copyStore;
  }
  else {
    return store;
  }
}