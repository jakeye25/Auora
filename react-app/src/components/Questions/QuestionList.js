import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { thunkGetAllQuestion } from "../../store/question";
import TopicList from "../Topics/TopicList";
import QuestionCreateFormModal from "./QuestionCreateFormModal";
import QuestionCreate from "./QuestionCreateFormModal/QuestionCreate";
import QuestionDelete from "./QuestionDelete";
import './QuestionList.css'
import QuestionUpdate from "./QuestionUpdate";



function QuestionList() {

    const questions = useSelector((state) => state.question)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user)
    const history = useHistory()

    if (!user) {
        history.push('/')
    }

    let allquestions = Object.values(questions)

    useEffect(() => {
        dispatch(thunkGetAllQuestion())
    }, [dispatch])

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
                                <div key={question.id}>
                                    <NavLink
                                        to={`/questions/${question?.id}`}
                                    >
                                        <div>
                                            {question?.questioncontent}
                                        </div>
                                    </NavLink>
                                    {question.questionimage ? <div><img
                                        className="qlist-questionimg"
                                        src={question?.questionimage}
                                        alt="img"></img></div> : <div></div>}

                                    <div><QuestionUpdate question={question} /></div>
                                    <div><QuestionDelete question={question} /></div>
                                </div>

                            ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default QuestionList
