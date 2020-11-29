import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import Loader from "../components/common/Loader"
type QuizProps = {
  difficulty?: string,
  amount: number
}

function Quiz(props: any) {

  console.log(props.getAllQuestions);
  return (
    <div>
      {/* {isLoading && <Loader />}
      {
        getAllQuestions.map((item: { category: React.ReactNode; }, index: string | number | null | undefined) => (
          <div key={index}>
            {item.category}
          </div>
        ))
      } */}
    </div>
  )
}

const mapStateToProps = (state: { questionReducer: { getAllQuestions: any; isLoading: any; error: any; }; }) => ({
  getAllQuestions: state.questionReducer.getAllQuestions,
  isLoading: state.questionReducer.isLoading,
  error: state.questionReducer.error
})

export default connect(mapStateToProps, null)(Quiz);

