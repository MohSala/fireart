import toastr from "toastr";
import axios from "axios";
import {
  FETCH_QUESTIONS_FUFILLED,
  FETCH_QUESTIONS_REJECTED,
  FETCH_QUESTIONS_REQUEST
} from "../actions/types";

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



export const getAllQuestions = (amount: number, difficulty: string, onError = false) => async (dispatch: any) => {
  try {
    dispatch(getQuestionsDataRequest());
    const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=boolean`, {})
    console.log(response.data);
    const { results } = response.data;
    dispatch(getQuestionsData(results));
  }
  catch (error) {
    dispatch(getQuestionsDataError(error));
    toastr.error(error);
  }
}