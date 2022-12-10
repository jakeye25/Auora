import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";

import './ProfilePage.css'
import { thunkGetProfile } from "../../store/profile";
import ProfileUpdateFormModal from "./ProfileUpdateFormModal";
import FollowUser from "../Follow/FollowUser";
import ProfileUpdateFormModal_description from "./ProfileUpdateFormModal/profile_description";
import ProfileUpdateFormModal_bio from "./ProfileUpdateFormModal/peofile_bio";
import { thunkGetCurrentQuestion } from "../../store/question";
import { thunkGetCurrentAnswer } from "../../store/answer";
import AnswerUpdateFormModal from "../Answers/AnswerUpdateFormModal";
import AnswerDeleteFormModal from "../Answers/AnswerDeleteFormModal";



function ProfilePage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const currUser= useSelector((state) => state.session.user)
    // console.log("curruser=======",currUser)
    // console.log("profile=======",profile)
    const profile= useSelector((state) => state.profile)
    const profileArr= Object.values(profile)
    const currProfile = profileArr.find((e) => e.id)
    // console.log("profileArr=======",profileArr)
    console.log("currprofile=======",currProfile)

    const questions= useSelector((state) => state.question)
    const answers= useSelector((state) => state.answer)

    const questionsArr= Object.values(questions)
    const answersArr= Object.values(answers)
    // console.log("questionsArr",questionsArr)
    // console.log("answersArr", answersArr)
    const currQuestions = questionsArr.filter(e => e.userId == id)
    const currAnswers= answersArr.filter(e => e.userId == id)
    console.log("currQuestions",currQuestions)
    console.log("currAnswers",currAnswers)


    useEffect(() => {
        dispatch(thunkGetProfile(id));
        dispatch(thunkGetCurrentQuestion())
        dispatch(thunkGetCurrentAnswer())
    }, [dispatch, id])

    return(
        <div className="profilecontainer">
            <div className="profile-top">
                <img
                    className="profile-topimg"
                    src={currProfile?.avatar}
                    alt='pic'
                    onError={e => { e.currentTarget.src = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"; }}
                ></img>
                <div className="profile-topright">
                    <div className="profile-toprightup">
                        <div className="profile-topusername">
                            {currProfile?.username}
                        </div>
                        {currUser?.id===currProfile?.id && <div>
                            <ProfileUpdateFormModal currProfile={currProfile} />
                        </div>}
                    </div>
                    {currProfile?.bio ? <div>{currProfile?.bio}</div>
                    : <div><ProfileUpdateFormModal_bio currProfile={currProfile}/></div>}
                    <div className="profile-follow">
                        <div>
                            {currProfile?.followers? currProfile?.followers?.length : "0" } followers &nbsp;·
                        </div>
                        <div>
                        &nbsp;{currProfile?.following? currProfile?.following?.length : "0" } following
                        </div>
                    </div>
                    {currUser?.id===currProfile?.id ? <div></div>
                    :
                    <div>
                        <FollowUser/>
                    </div>}
                </div>
            </div>
            {currProfile?.description ? <div>{currProfile?.description}</div>
            : <div><ProfileUpdateFormModal_description currProfile={currProfile}/></div>}
            <div className="profile-bottom">
                <nav>
                    <div>
                        Profile
                    </div>
                </nav>
                <div>Profile</div>
                <div className="profile-bottom-content-container">
                    {(currAnswers||currQuestions) ?
                    <div>
                        {currAnswers.map((answer, i) => (

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
                                            onError={e => { e.currentTarget.src = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"; }}
                                            ></img>
                                            <div className="my_answer_listing_profile-right">
                                                <div>{currUser?.username}</div>
                                                <div>{answer?.createdAt.slice(7, 16)}</div>
                                            </div>
                                        </div>
                                        <div className="myanswer-btn">
                                            <div><AnswerUpdateFormModal answer={answer}/></div>
                                            <div><AnswerDeleteFormModal answer={answer}/></div>
                                        </div>
                                    </div>
                                        <div className="myanswer-content">{answer?.answercontent}</div>
                            </div>
                        ))}
                        {questionfilter.map((question, i) => (
                            <div key={i} className="my_question_listing_innerbox">

                                    <div className="my_question_listing_nav">
                                        <NavLink className='my_question_listing_link' to={`/questions/${question?.id}`}>

                                        {question?.questioncontent}
                                        </NavLink>
                                    </div>
                                    <div className="myquestion-bottom">
                                        <div className="my_question_listing_len">{question?.answers?.length} answers</div>
                                        <div className="my_question_listing_btn_container">
                                            <div className="my_question_listing_btn">
                                                <QuestionUpdateFormModal question={question} />
                                            </div>
                                            <div className="my_question_listing_btn">
                                                <QuestionDeleteFormModal question={question} />
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        ))}
                    </div>
                : <div>You don't have any activities yet.</div>}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
