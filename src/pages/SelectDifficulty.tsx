import React, { useState, Dispatch, FormEvent } from 'react';
import "./style.css";
import { getQuizQuestions } from "../store/actions/quiz";
import { connect } from "react-redux"
import { useHistory } from 'react-router-dom';
import Loader from "../components/common/Loader";

interface QProps {
  getQuizQuestions: (amount: number, difficulty: any) => void,
  isLoading?: boolean;
}

const SelectDifficulty = (props: QProps) => {
  const history = useHistory();
  const { getQuizQuestions, isLoading } = props;
  const [difficulty, setDifficulty] = useState("");
  const [amount, setAmount] = useState(0);

  const changeDifficulty = async (e: any) => {
    setDifficulty(e.target.value);
  }
  const changeAmount = async (e: any) => {
    setAmount(e.target.value);
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (amount && difficulty) {
      await getQuizQuestions(amount, difficulty);
      history.push('/quiz');
    }
  }

  return (

    <div>
      {isLoading ? <Loader /> :
        <div className="body">
          <h3 className="body header">Welcome To The Trivia Challenge!</h3>
          <form className="body data-form" onSubmit={handleFormSubmit}>
            <select className="input" onChange={changeDifficulty}>
              <option value="0">Select difficulty</option>
              <option value="easy">Easy</option>
              <option value="hard">Hard</option>
            </select>
            <input className="input" type="number" onChange={changeAmount} placeholder="amount" />
            <button disabled={!amount || !difficulty} className="submitForm" type="submit">
              BEGIN
        </button>
          </form>
        </div>
      }

    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getQuizQuestions: (amount: number, difficulty: any) => dispatch(getQuizQuestions(amount, difficulty))
})

const mapStateToProps = (state: { questionReducer: { isLoading: boolean; }; }) => ({
  isLoading: state.questionReducer.isLoading,
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectDifficulty);