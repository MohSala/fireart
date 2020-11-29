import React, { useState, useEffect, Dispatch } from 'react';
import "./style.css";
import { FilteredData, clearData } from "../store/actions/quiz";
import { useHistory } from 'react-router-dom';
import { connect } from "react-redux"
import { decodeHTMLEntities } from "../utilities/HTMLentityDecoder"
import { plus, minus } from "../components/common/svgIcons"
interface ResultProps {
  getAllQuestions: FilteredData[],
  answer: string[],
  clearData: () => void
}

const Results = (props: ResultProps) => {
  const history = useHistory();
  const { getAllQuestions, answer, clearData } = props;
  const [score, setScore] = useState<boolean[] | undefined>([]);
  const [result, setResult] = useState<boolean[] | undefined>([]);

  const validateAnswers = () => {
    return getAllQuestions.map((q: FilteredData, index: number) => {
      return q.correct_answer.toUpperCase() === answer[index].toUpperCase()
    })
  }

  const calcScore = () => {
    return result?.filter((result) => result)
  }

  const playAgainHandler = () => {
    clearData();
    history.push('/');
  }


  // SET RESULT
  useEffect(() => {
    if (getAllQuestions.length === 0 && answer.length === 0) {
      history.push('/')
    }
    setResult(validateAnswers())
  }, []);

  // SET SCORES
  useEffect(() => {
    setScore(calcScore())
  }, [result]);

  return (
    <div className="quiz-body">
      <h3 className='score-header'>You scored <br /> {score?.length} / {result?.length}</h3>

      <ul className='quiz-body list'>
        {getAllQuestions.map((question, index: number) => {
          return (
            <li className='quiz-body list items'
              key={index}>
              {result && result[index] ? plus : minus}
              <span>{decodeHTMLEntities(question.question)}</span>
            </li>

          )
        })}</ul>

      <button className="form-btn play-again" onClick={playAgainHandler}>PLAY AGAIN?</button>
    </div>
  );
}

const mapStateToProps = (state: { questionReducer: { getAllQuestions: any; isLoading: any; error: any; answer: string[] }; }) => ({
  getAllQuestions: state.questionReducer.getAllQuestions,
  answer: state.questionReducer.answer
})

const dispatchStateToProps = (dispatch: Dispatch<any>) => {
  return {
    clearData: () => dispatch(clearData())
  }
}

export default connect(mapStateToProps, dispatchStateToProps)(Results)
