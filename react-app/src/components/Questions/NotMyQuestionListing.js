import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { thunkGetAllQuestion, thunkGetCurrentQuestion } from "../../store/question";
import QuestionDelete from "./QuestionDelete";
import QuestionUpdateFormModal from "./QuestionEditFormModal";
import { thunkGetAllQuestionAnswer } from "../../store/answer";



function NotMyQuestionListings() {
    const dispatch = useDispatch()
    const history = useHistory()

    const questions = useSelector((state) => state.question)

    console.log('questions',questions)
    const user = useSelector((state) => state.session.user)
    const answers = useSelector((state) => state.answer)

    if (!user) {
        history.push('/')
    }

    let allquestions = Object.values(questions)
    console.log("allquesstionarr", allquestions)

    const questionfilter = allquestions.filter(question => question?.userId != user?.id);
    console.log('filter', questionfilter)

    useEffect(() => {
        // dispatch(thunkGetAllProduct())
        dispatch(thunkGetAllQuestion())
        dispatch(thunkGetAllQuestionAnswer())
    }, [dispatch, answers])

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
                                    <div>{question?.answers?.length}</div>
                                    {/* <div id="my_question_listing_btn_container">
                                        <QuestionUpdateFormModal question={question} />
                                        <QuestionDelete question={question} />
                                    </div> */}
                                </div>
                            </div>
                        ))}
                    </div>

                )}
            </div>


        </>
    )
}

export default NotMyQuestionListings
