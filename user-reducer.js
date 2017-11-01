export default function user(store={}, action) {
  if(action.type == 'user') {
    return action.value;
  } else if(action.type == 'updateAvailability') {
    var copyStore = Object.assign({}, store);
    copyStore.availability[action.day].hours = action.hours;
    console.log(copyStore);
  	return copyStore;
  } else {
    return store;
  }
}