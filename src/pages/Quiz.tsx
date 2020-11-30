import React, { useEffect, useState, Dispatch } from 'react';
import { useDispatch, connect } from 'react-redux';
import { useHistory } from "react-router-dom"
import { FilteredData, storeAnswer } from "../store/actions/quiz"
import "./style.css";
import { decodeHTMLEntities } from "../utilities/HTMLentityDecoder"

type QuizProps = {
  getAllQuestions: FilteredData[];
  answer: string[];
  isLoading: boolean;
  storeAnswer: (answer: string) => void;
}

function Quiz(props: QuizProps) {
  const { getAllQuestions, answer, isLoading, storeAnswer } = props;
  const [fetchedQuestions, setFetchedQuestions] = useState<FilteredData | FilteredData[]>([]);
  const [counter, setCounter] = useState<number>(1);
  const history = useHistory();


  //First USE_EFFECT(using as compDidMount) using use effect to set State for localized question array;
  useEffect(() => {
    setFetchedQuestions(JSON.parse(JSON.stringify([...getAllQuestions])));
  }, []);

  //Second USE_EFFECT(using as compDidUpdate) using use effect to monitor answer length and value change;
  //to trigger redirect

  useEffect(() => {
    if (Array.isArray(getAllQuestions) && getAllQuestions.length === 0 && answer.length === 0) {
      history.push('/')
    } else if (Array.isArray(fetchedQuestions) && fetchedQuestions.length === 0 && answer.length !== 0) {
      history.push('/results')
    }

  }, [props])

  const handleClick = (e: any) => {
    e.preventDefault();
    const { value } = e.target;
    storeAnswer(value);
    if (Array.isArray(fetchedQuestions) && fetchedQuestions.length !== 0) {
      fetchedQuestions.shift();
      setCounter(counter + 1);
    }
  }

  return (
    <div className="quiz-body">
      {fetchedQuestions && Array.isArray(fetchedQuestions) && fetchedQuestions.length !== 0 &&
        <div>
          <h2 className='quiz-body question-header'>{fetchedQuestions[0].category}</h2>
          <form className="quiz-body quiz-form">
            <div className='question-header'>
              {decodeHTMLEntities(fetchedQuestions[0].question)}
            </div>

            <div className="form-buttons">
              <button className="form-btn" value='TRUE' onClick={handleClick}>TRUE</button>
              <button className="form-btn" value='FALSE' onClick={handleClick}>FALSE</button>
            </div>
          </form>
          <p className="quiz-body">{counter} of {getAllQuestions.length}</p>
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state: { questionReducer: { getAllQuestions: any; isLoading: any; error: any; answer: string[] }; }) => ({
  getAllQuestions: state.questionReducer.getAllQuestions,
  isLoading: state.questionReducer.isLoading,
  error: state.questionReducer.error,
  answer: state.questionReducer.answer
})

const mapDispatchStateToProps = (dispatch: Dispatch<any>) => {
  return {
    storeAnswer: (answer: string) => dispatch(storeAnswer(answer))
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(Quiz);

