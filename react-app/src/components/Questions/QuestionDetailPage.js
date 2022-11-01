import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneQuestion } from "../../store/question";
import { thunkGetAllQuestionAnswer } from "../../store/answer";
import './QuestionDetailPage.css'

function QuestionDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state)
    const question = useSelector((state) => state.question[id])
    const answer = useSelector((state) => state.answer)
    let answerArr =  question?.answers
    console.log('question', question?.answers)

    useEffect(() => {
        dispatch(thunkGetOneQuestion(id));
        dispatch(thunkGetAllQuestionAnswer(id))
    }, [dispatch, id])

    return (
        <div id="qdetail-container">
            <div id="qdetail-indcontainer">
                <div className="qdetail-title">{question?.questioncontent}</div>
                <div>{question?.answers?.length}&nbsp;answers</div>
                {answerArr &&
                answerArr.map((ele) => (
                    <div key={ele.id}>
                        <div>{ele?.username}</div>
                        <div>{ele?.answercontent}</div>
                    </div>
                ))}
            </div>


        </div>
    )


}

export default QuestionDetailPage
