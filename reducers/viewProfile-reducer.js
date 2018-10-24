export default function viewProfile(store={}, action) {
  if(action.type == 'viewProfile') {
    return action.value;
  } else {
    return store;
  }
}