import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { thunkGetAllQuestion } from "../../store/question";
import './QuestionList.css'


function QuestionList () {

    const questions = useSelector((state) => state.question)
    const dispatch = useDispatch()

    let allquestions = Object.values(questions)

    useEffect(() => {
        dispatch(thunkGetAllQuestion())
    }, [dispatch])

    return(
        <>

            <div id="questionlist-container">
                {allquestions &&
                    allquestions.map((question) => (
                    <div key = {question.id}>
                        <NavLink
                        to = {`/questions/${question.id}`}
                        >
                            <div>
                                {question.questioncontent}
                            </div>
                        </NavLink>
                        </div>
                ))}
            </div>
        </>
    )
}

export default QuestionList
