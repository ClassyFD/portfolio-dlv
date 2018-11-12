import * as actions from '../actions/nav.actions';
import { createReducer } from '../../utility/utility';


const init = {
  comp: 'home',
  animatedComp: {
    status: false,
    route: '/'
  },
}

const assign = {
  setMountedComp: (state, action) => {
    return {
      ...state,
      comp: action.value
    }
  },
  setAnimatedComp: (state, action) => {
    return {
      ...state,
      animatedComp: action.value
    }
  },
}

const handlers = {
  [actions.SET_MOUNTED_COMP]: assign.setMountedComp,
  [actions.SET_ANIMATED_COMP]: assign.setAnimatedComp,
}

export default createReducer(init, handlers);