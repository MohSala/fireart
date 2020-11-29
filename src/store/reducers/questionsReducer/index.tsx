import {
  FETCH_QUESTIONS_FUFILLED,
  FETCH_QUESTIONS_REJECTED,
  FETCH_QUESTIONS_REQUEST,
  STORE_ANSWER,
  STORE_QUESTIONS,
  RESET_DATA
} from "../../actions/types";

const initialState = {
  getAllQuestions: [],
  isLoading: false,
  error: null,
  questions: [],
  answer: []
};

const questionReducer = (state = initialState, action: { type: any; data: any; dataError: any; questions: any; answer: any; }) => {
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
    case STORE_QUESTIONS:
      return {
        ...state,
        questions: action.questions
      }
    case RESET_DATA:
      return {
        questions: [],
        answer: []
      }
    case STORE_ANSWER:
      return {
        ...state,
        answer: state.answer.concat(action.answer)
      }
    default:
      return state;
  }
}

export default questionReducer;