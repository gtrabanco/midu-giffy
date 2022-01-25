import { useReducer } from "react"

const REDUCER_ACTIONS = {
  UPDATE_KEYWORD: "updateKeyword",
  UPDATE_RATING: "updateRating"
}

const REDUCERS = {
  [REDUCER_ACTIONS.UPDATE_KEYWORD]: (state, payload) => {
    console.log(payload)
    return {
      ...state,
      keyword: payload,
      times: state.times + 1
    }
  },
  [REDUCER_ACTIONS.UPDATE_RATING]: (state, payload) => {
    console.log(payload)
    return {
      ...state,
      rating: payload
    }
  }
}

const reducer = (state, action) => {
  const reducer = REDUCERS[state.action]
  return reducer?
    reducer(state, action.payload):
    state;
}

export function useSearchForm ({ initialKeyword = '', initialRating = 'g'} = {}) {
  const [state, dispatch] = useReducer(reducer, {
    keyword: decodeURIComponent(initialKeyword),
    rating: initialRating,
    times: 0
  })

  const { keyword, rating, times } = state

  return {
    keyword,
    rating,
    times,
    updateKeyword: (keyword) => {
      dispatch({
        action: REDUCER_ACTIONS.UPDATE_KEYWORD,
        payload: keyword
      })
    },
    updateRating: (rating) => {
      dispatch({
        action: REDUCER_ACTIONS.UPDATE_RATING,
        payload: rating
      })
    }
  }
}
