import { useReducer } from "react";

import { formReducer as reducer, FORM_REDUCER_ACTIONS as ACTION } from "./lib/reducer";


export function useSearchForm({
  initialKeyword = "",
  initialRating = "g",
} = {}) {
  const [state, dispatch] = useReducer(reducer, {
    keyword: decodeURIComponent(initialKeyword),
    rating: initialRating,
    times: 0,
  });

  const { keyword, rating, times } = state;

  return {
    keyword,
    rating,
    times,
    updateKeyword: (keyword) => {
      dispatch({
        type: ACTION.UPDATE_KEYWORD,
        payload: keyword,
      });
    },
    updateRating: (rating) => {
      dispatch({
        type: ACTION.UPDATE_RATING,
        payload: rating,
      });
    },
  };
}
