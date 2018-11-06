import * as actions from '../actions/nav.actions';
import { createReducer } from '../../utility/utility';

const init = {
  comp: 'home'
}

const assign = {
  setMountedComp: (state, action) => {
    return {
      ...state,
      comp: action.value
    }
  }
}

const handlers = {
  [actions.SET_MOUNTED_COMP]: assign.setMountedComp
}

export default createReducer(init, handlers);