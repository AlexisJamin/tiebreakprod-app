import {Reducer, ActionConst, Actions} from 'react-native-router-flux'

const defaultReducer = Reducer();

export default (state, action) => {
  console.log('Reducing action: ', action.type);
  switch (action.type) {
      case ActionConst.FOCUS:
          console.log('FOCUS event fired with scene parameter: ', action.routeName);
          return defaultReducer(state, action);

      default:
        var nono = defaultReducer(state, action);
        console.log('nono');
        console.log(nono);
        return nono;
  }
}