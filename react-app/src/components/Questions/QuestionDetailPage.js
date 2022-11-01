import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetOneQuestion } from "../../store/question";
import { thunkGetAllQuestionAnswer } from "../../store/answer";
import './QuestionDetailPage.css'
import AnswerCreateFormModal from "../Answers/AnswerCreateFormModal";



function QuestionDetailPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const[exist, setExist] =useState(false)
    const user = useSelector((state) => state.session.user)
    const question = useSelector((state) => state.question[id])
    const answer = useSelector((state) => state.answer)
    let answerArr =  question?.answers
    console.log('question', question)
    console.log('user', user)
    console.log('answer', answer)
    let ansArr = Object.values(answer)
    console.log('ansArr', ansArr)
    let useranswered = ansArr.filter((ele) => ele?.userId === user?.id)
    console.log('userans', useranswered)




    // if(!user) history.push('/')

    useEffect(() => {
        dispatch(thunkGetOneQuestion(id));
        dispatch(thunkGetAllQuestionAnswer(id))
    }, [dispatch, id])

    return (
        <div id="qdetail-container">
            <div id="qdetail-indcontainer">
                <div className="qdetail-title">{question?.questioncontent}</div>
                <div>{question?.answers?.length}&nbsp;answers</div>
                {question?.userId != user?.id && useranswered?.length == 0 &&
                <div className="qdetail-createans"><AnswerCreateFormModal question={question}/></div>
                }
            </div>
                {answerArr &&
                answerArr.map((ele) => (
                    <div className="qdetail-indanswer" key={ele.id}>
                        <div className="qdetail-indanswer-user" >
                            <img
                            src={ele?.avatar}
                            alt="pic"
                            ></img>
                            <div>&nbsp;&nbsp;{ele?.username}</div>
                        </div>
                        <div className="qdetail-indanswer-content">{ele?.answercontent}</div>
                    </div>
                ))}



        </div>
    )


}

export default QuestionDetailPage
