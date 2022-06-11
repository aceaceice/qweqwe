import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  LOG_IN,
  LOG_IN_FAILURE,
  LOG_IN_SUCCEES,
  LOG_OUT,
} from "../actions/types";
const initialState = {
  user: "",
  loading: false,
  error: "",
};
const reducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case FETCH_USER:
      return { ...state, loading: true };
    case FETCH_USER_SUCCESS:
      return { ...state, user: payload, loading: false };
    case LOG_IN:
      return { ...state, loading: true, error: "" };
    case LOG_IN_SUCCEES:
      return { ...state, user: payload, error: "", loading: false };
    case LOG_IN_FAILURE:
      return {
        ...state,
        user: "",
        loading: false,
        error: "Failed login attempt",
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
