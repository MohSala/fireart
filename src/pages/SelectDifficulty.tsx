import React, { useState } from 'react';
import "./style.css";
import { Link } from "react-router-dom";
export default function SelectDifficulty() {

  const [difficulty, setDifficulty] = useState("");
  const [amount, setAmount] = useState(0);

  const changeDifficulty = async (e: any) => {
    await setDifficulty(e.target.value);
  }
  const changeAmount = async (e: any) => {
    await setAmount(e.target.value);
  }

  return (
    <div className="body">
      <h3 className="header-text">Welcome To The Trivia Challenge!</h3>

      <div className="container col-md-6">
        <div className="card border-secondary mb-3">
          <div className="card-body">
            <h4 className="card-title">A Quiz About Anything!</h4>
            <p className="card-text">
              This is a simple quiz to see how much general knowledge you have on basic topics! Let's Go!.
              </p>
          </div>
          <div className="container form-group">
            <label>Select A Difficulty</label>
            <select className="form-control col-md-6" onChange={changeDifficulty}>
              <option value="0">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="container form-group">
            <label>Amount</label>
            <input
              type="number"
              className="form-control col-md-6"
              placeholder="e.g 4, 5, 10, etc"
              onChange={changeAmount}
            />
          </div>

          <Link to={`/quiz/${difficulty}/${amount}`} style={{ textDecoration: "none" }}>
            <button
              type="button"
              disabled={!amount || !difficulty}
              className="btn btn-success btn-lg btn-block"

            >
              BEGIN QUIZ
          </button>
          </Link>
          {/* */}
        </div>
      </div>
    </div>
  )
}
