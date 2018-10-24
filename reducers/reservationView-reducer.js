export default function reservationView(store={}, action) {
  if(action.type == 'reservationView') {
    return action.value;
  } else {
    return store;
  }
}