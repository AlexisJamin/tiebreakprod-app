export default function user(store={}, action) {
  if(action.type == 'user') {
  	console.log(action);
    return action.value;
  } else {
  	console.log('else');
  	console.log(action);
    return store;
  }
}