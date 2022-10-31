import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { thunkGetCurrentAnswer } from "../../store/answer";


function MyAnswerListings() {

    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const history=useHistory()
    const currentAnswer = useSelector(state => state.answer)

    const currentAnswerArr = Object.values(currentAnswer)

    const answerfilter = currentAnswerArr.filter(answer => answer?.userId === user?.id);
    console.log('myanswer', answerfilter)

    useEffect(() => {
        // dispatch(thunkGetAllProduct())
        dispatch(thunkGetCurrentAnswer())
    }, [dispatch])

    if (!user) history.push('/')

    return (
        <div id="myanswer-container">
                {answerfilter.length === 0 ? (<h1>You have no answer so far</h1>) : (
                    <div>
                        {answerfilter.map((answer, i) => (
                            <div key={i}>
                                <div className="my_question_listing_innerbox">
                                    <div className="my_question_listing_nav">
                                        <NavLink to={`/questions/${answer?.questionId}`}>

                                        <div className="my_question_listing_name">{answer?.question}</div>
                                        </NavLink>
                                    </div>
                                    <div>{answer?.answercontent}</div>
                                    {answer.answerimage ? <div><img
                                        className="qlist-questionimg"
                                        src={answer?.answerimage}
                                        alt="img"></img></div> : <div></div>}
                                    {/* <div id="my_question_listing_btn_container">
                                        <Link id="userquestioneditbtn" to={`/questions/${question?.id}/edit`}>
                                            Edit question
                                        </Link>
                                        <QuestionDelete question={question} />
                                    </div> */}
                                </div>
                            </div>
                        ))}
                    </div>

                )}
        </div>
    )

}

export default MyAnswerListings
