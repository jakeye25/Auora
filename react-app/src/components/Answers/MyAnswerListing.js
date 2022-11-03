import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { thunkGetCurrentAnswer } from "../../store/answer";
import './MyAnswerListing.css'
import AnswerDeleteFormModal from "./AnswerDeleteFormModal";
import AnswerUpdateFormModal from "./AnswerUpdateFormModal";



function MyAnswerListings() {

    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const history=useHistory()
    const currentAnswer = useSelector(state => state.answer)

    const currentAnswerArr = Object.values(currentAnswer)

    const answerfilter = currentAnswerArr.filter(answer => answer?.userId === user?.id);
    console.log('myanswer', answerfilter)

    useEffect(() => {

        dispatch(thunkGetCurrentAnswer())
    }, [dispatch])

    if (!user) history.push('/')

    return (
        <div id="myanswer-container">
                {answerfilter.length === 0 ? (<h1 className="myanswerlisting-top">You have not answer a question so far</h1>) : (
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
                                    <div className="myanswers-userbtn-container">
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
                                        <div className="myanswer-btn">
                                            <div><AnswerUpdateFormModal answer={answer}/></div>
                                            <div><AnswerDeleteFormModal answer={answer}/></div>
                                        </div>
                                    </div>
                                        <div className="myanswer-content">{answer?.answercontent}</div>
                                    {answer.answerimage ? <div><img
                                        className="myanswerimg"
                                        src={answer?.answerimage}
                                        alt="img"></img></div> : <div></div>}

                            </div>
                        ))}
                    </div>

                )}
        </div>
    )

}

export default MyAnswerListings
