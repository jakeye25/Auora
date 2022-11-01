import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { thunkGetCurrentQuestion } from "../../store/question";
import QuestionUpdateFormModal from "./QuestionEditFormModal";

import './MyQuestionListing.css'
import QuestionDeleteFormModal from "./QuestionDeleteFormModal";


function MyQuestionListings() {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.session.user)

    const currentQuestion = useSelector(state => state.question)

    const currentQuestionArr = Object.values(currentQuestion)

    const questionfilter = currentQuestionArr.filter(question => question?.userId === user?.id);

    useEffect(() => {
        // dispatch(thunkGetAllProduct())
        dispatch(thunkGetCurrentQuestion())
    }, [dispatch])

    if (!user) history.push('/')


    return (
        <>
            <div id='myquestionlist-container'>

                {questionfilter.length === 0 ? (<h1>You have not questions posted so far</h1>) : (

                    <div>
                        <h1>You have {questionfilter?.length} questions</h1>
                        {questionfilter.map((question, i) => (
                            <div key={i}>
                                <div className="my_question_listing_innerbox">
                                    <div className="my_question_listing_nav">
                                        <NavLink to={`/questions/${question?.id}`}>

                                        <div className="my_question_listing_name">{question?.questioncontent}</div>
                                        </NavLink>
                                    </div>
                                    <div>{question?.answers?.length} Answers</div>
                                    <div id="my_question_listing_btn_container">
                                        {/* <Link id="userquestioneditbtn" to={`/questions/${question?.id}/edit`}>
                                            Edit question
                                        </Link> */}
                                        <QuestionUpdateFormModal question={question} />
                                        <QuestionDeleteFormModal question={question} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                )}
            </div>


        </>
    )
}

export default MyQuestionListings
