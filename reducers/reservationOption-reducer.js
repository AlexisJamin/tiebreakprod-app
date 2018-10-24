export default function reservationOption(store={}, action) {
  if(action.type == 'reservationOption') {
    return action.value;
  } else {
    return store;
  }
}