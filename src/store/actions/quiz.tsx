import toastr from "toastr";
import axios from "axios";
import {
  FETCH_QUESTIONS_FUFILLED,
  FETCH_QUESTIONS_REJECTED,
  FETCH_QUESTIONS_REQUEST,
  STORE_ANSWER,
  STORE_QUESTIONS,
  RESET_DATA
} from "../actions/types";

export interface FilteredData {
  correct_answer: string,
  question: string,
  category: string
}

const getQuestionsData = (data: any) => ({
  type: FETCH_QUESTIONS_FUFILLED,
  data
});

const getQuestionsDataError = (dataError: any) => ({
  type: FETCH_QUESTIONS_REJECTED,
  dataError
});

const getQuestionsDataRequest = () => ({
  type: FETCH_QUESTIONS_REQUEST
});

export const storeQuestions = (questions: FilteredData[]) => {
  return {
    type: STORE_QUESTIONS,
    questions
  }
}

export const storeAnswer = (answer: string) => {
  return {
    type: STORE_ANSWER,
    answer
  }
}

export const clearData = () => {
  return {
    type: RESET_DATA
  }
}

//Filter Data Helper to return question answer and category object
export const filterateDataObject = (questions: any): FilteredData[] => {
  return questions.map((question: any) => {
    return {
      question: question.question,
      correct_answer: question.correct_answer,
      category: question.category
    }
  })
}

export const getQuizQuestions = (amount: number, difficulty: string, onError = false) => async (dispatch: any) => {
  try {
    dispatch(getQuestionsDataRequest());
    const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=boolean`, {})
    const { results } = response.data;
    dispatch(getQuestionsData(filterateDataObject(results)));
  }
  catch (error) {
    dispatch(getQuestionsDataError(error));
    toastr.error(error);
  }
}