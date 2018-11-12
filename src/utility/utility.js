export const createReducer = (initialState, actionHandlers) => {
  return function reducer(state = initialState, action) {
    if (actionHandlers.hasOwnProperty(action.type)) {
      return actionHandlers[action.type](state, action);
    } else {
      return state;
    }
  };
};
export const debounce = (cb, wait, call) => {
  let timeout;
  let immediate;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      cb();
    }, wait);
    if (!immediate){
      immediate = setTimeout(()=>{
        immediate = null;
        cb();
      }, call)
    }
  }
}