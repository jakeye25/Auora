import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { thunkGetCurrentQuestion } from "../../store/question";
import QuestionDelete from "./QuestionDelete";
import QuestionUpdateFormModal from "./QuestionEditFormModal";

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
                {questionfilter.length === 0 ? (<h1>You have no products to sell so far</h1>) : (
                    <div>
                        {questionfilter.map((question, i) => (
                            <div key={i}>
                                <div className="my_question_listing_innerbox">
                                    <div className="my_question_listing_nav">
                                        <NavLink to={`/questions/${question?.id}`}>

                                        <div className="my_question_listing_name">{question?.questioncontent}</div>
                                        </NavLink>
                                    </div>
                                    <div>{question?.answers}</div>
                                    <div id="my_question_listing_btn_container">
                                        {/* <Link id="userquestioneditbtn" to={`/questions/${question?.id}/edit`}>
                                            Edit question
                                        </Link> */}
                                        <QuestionUpdateFormModal question={question} />
                                        <QuestionDelete question={question} />
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
