import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { thunkGetAllQuestion } from "../../store/question";
import TopicList from "../Topics/TopicList";
import QuestionCreateFormModal from "./QuestionCreateFormModal";
import QuestionEditDeleteBtn from "./QuestionEditDeleteBtn";
import './QuestionList.css'

import AnswerCreateFormModal from "../Answers/AnswerCreateFormModal";
import { thunkGetAllQuestionAnswer } from "../../store/answer";



function QuestionList() {

    const questions = useSelector((state) => state.question)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const answers = useSelector((state) => state.answer)
    const history = useHistory()

    if (!user) {
        history.push('/')
    }

    let allquestions = Object.values(questions)

    useEffect(() => {
        dispatch(thunkGetAllQuestion())
        dispatch(thunkGetAllQuestionAnswer())
    }, [dispatch, answers])

    return (
        <>

            <div id="questionlist-container">
                <div id="qlist-topic-container">
                    <TopicList />
                </div>
                <div id="qlist-middle-container">
                    <div id="qlist-middle-container-top">
                        <img
                        className="qlist-avatar"
                        src={user?.avatar}
                        alt='pic'
                        ></img>
                        <div className="qlist-middle-container-topitem">
                            <QuestionCreateFormModal />
                        </div>
                        <span>|</span>
                        <div className="qlist-middle-container-topitem" >
                            <NavLink id="qlist-middle-container-toplink" to={`/answers`}>
                            <i class="fa-regular fa-pen-to-square"></i>&nbsp;Answer
                            </NavLink>
                        </div>
                    </div>
                    <div id='qlist-middle-container-middle'>
                        {allquestions &&
                            allquestions.map((question) => (
                                <div key={question?.id} className='qlist-indquestion'>
                                    <NavLink
                                        to={`/questions/${question?.id}`}
                                    >
                                        <div className="qlist-questioncontent">
                                            {question?.questioncontent}
                                        </div>
                                    </NavLink>
                                    <NavLink className="qlist-indquestion-2ndcontainer"
                                     to={`/questions/${question?.id}`}>
                                        {question?.answers?.length ? question?.answers?.length : 'No'}&nbsp;answers</NavLink>
                                    {/* {question?.userId === user?.id &&
                                    <div className="qlist-indquestion-3rdcontainer">
                                        <div><AnswerCreateFormModal question={question}/></div> */}
                                        {/* <div><QuestionEditDeleteBtn user={user} question={question}/></div> */}
                                    {/* </div>} */}
                                    {question.questionimage ? <img
                                        className="qlist-questionimg"
                                        src={question?.questionimage}
                                        alt="img"></img> : <div></div>}
                                    {/* <div><QuestionUpdate question={question} /></div>
                                    <div><QuestionDelete question={question} /></div> */}
                                </div>

                            ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default QuestionList
