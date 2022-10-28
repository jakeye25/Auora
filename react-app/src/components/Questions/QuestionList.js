import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { thunkGetAllQuestion } from "../../store/question";
import './QuestionList.css'


function QuestionList () {

    const questions = useSelector((state) => state.question)


    return(
        <>
            <h1>Welcome</h1>
            <div id="questionlist-container">

            </div>
        </>
    )
}

export default QuestionList
