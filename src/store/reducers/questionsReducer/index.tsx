import {
  FETCH_QUESTIONS_FUFILLED,
  FETCH_QUESTIONS_REJECTED,
  FETCH_QUESTIONS_REQUEST
} from "../../actions/types";

const initialState = {
  getAllQuestions: [],
  isLoading: false,
  error: null
};

const questionReducer = (state = initialState, action: { type: any; data: any; dataError: any; }) => {
  switch (action.type) {
    case FETCH_QUESTIONS_REQUEST:
      return {
        ...state,
        getAllQuestions: [],
        isLoading: true,
        error: false
      }
    case FETCH_QUESTIONS_FUFILLED:
      return {
        ...state,
        getAllQuestions: action.data,
        isLoading: false,
        error: null
      }
    case FETCH_QUESTIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: action.dataError
      }
    default:
      return state;
  }
}

export default questionReducer;