const FORM_REDUCER_ACTIONS = {
  UPDATE_KEYWORD: "updateKeyword",
  UPDATE_RATING: "updateRating",
};

const REDUCERS = {
  [FORM_REDUCER_ACTIONS.UPDATE_KEYWORD]: (state, payload) => {
    return {
      ...state,
      keyword: payload,
      times: state.times + 1,
    };
  },
  [FORM_REDUCER_ACTIONS.UPDATE_RATING]: (state, payload) => {
    return {
      ...state,
      rating: payload,
    };
  },
};

const formReducer = (state, action) => {
  const reducer = REDUCERS[action.type];
  return reducer ? reducer(state, action.payload) : state;
};

export {formReducer, FORM_REDUCER_ACTIONS}
