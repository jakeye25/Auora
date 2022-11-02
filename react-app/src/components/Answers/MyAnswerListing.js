import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { thunkGetCurrentAnswer } from "../../store/answer";
import AnswerUpdate from "./AnswerUpdateFormModal/AnswerUpdate";
import AnswerDelete from "./AnswerDelete";
import AnswerCUpdateFormModal from "./AnswerUpdateFormModal";
import './MyAnswerListing.css'

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
                        <h1 className="myanswerlisting-top">You have {answerfilter?.length} answers</h1>
                        {answerfilter.map((answer, i) => (
                            <div key={i} className="my_answer_listing_innerbox">

                                    <div className="my_answer_listing_nav">
                                        <NavLink
                                        className='my_answer_listing_link'
                                        to={`/questions/${answer?.questionId}`}>

                                        {answer?.question}
                                        </NavLink>
                                    </div>
                                    <div className="my_answer_listing_profile">
                                        <img
                                        src={answer?.avatar}
                                        alt='pic'
                                        ></img>
                                        <div className="my_answer_listing_profile-right">
                                            <div>{user?.username}</div>
                                            <div>{answer?.createdAt.slice(7, 16)}</div>
                                        </div>
                                    </div>
                                        <div>{answer?.answercontent}</div>
                                    {answer.answerimage ? <div><img
                                        className="qlist-questionimg"
                                        src={answer?.answerimage}
                                        alt="img"></img></div> : <div></div>}
                                        <div><AnswerCUpdateFormModal answer={answer}/></div>
                                        <div><AnswerDelete answer={answer}/></div>
                                    {/* <div id="my_question_listing_btn_container">
                                        <Link id="userquestioneditbtn" to={`/questions/${question?.id}/edit`}>
                                            Edit question
                                        </Link>
                                        <QuestionDelete question={question} />
                                    </div> */}

                            </div>
                        ))}
                    </div>

                )}
        </div>
    )

}

export default MyAnswerListings
