import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { thunkGetAllQuestion } from "../../store/question";
import TopicList from "../Topics/TopicList";
import QuestionCreateFormModal from "./QuestionCreateFormModal";
import QuestionCreate from "./QuestionCreateFormModal/QuestionCreate";
import QuestionDelete from "./QuestionDelete";
import QuestionEditDeleteBtn from "./QuestionEditDeleteBtn";
import './QuestionList.css'
import QuestionUpdate from "./QuestionEditFormModal/QuestionUpdate";
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
                        <QuestionCreateFormModal />
                    </div>
                    <div id='qlist-middle-container-middle'>
                        {allquestions &&
                            allquestions.map((question) => (
                                <div key={question?.id}>
                                    <NavLink
                                        to={`/questions/${question?.id}`}
                                    >
                                        <div>
                                            {question?.questioncontent}
                                        </div>
                                    </NavLink>
                                    <div>{question?.answers?.length} &nbsp;answers</div>
                                    <div><AnswerCreateFormModal question={question}/></div>
                                    {question.questionimage ? <div><img
                                        className="qlist-questionimg"
                                        src={question?.questionimage}
                                        alt="img"></img></div> : <div></div>}
                                    <div><QuestionEditDeleteBtn user={user} question={question}/></div>
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
