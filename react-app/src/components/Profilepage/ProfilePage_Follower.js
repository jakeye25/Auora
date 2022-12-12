import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";

import './ProfilePage.css'
import { thunkGetProfile } from "../../store/profile";
import ProfileUpdateFormModal from "./ProfileUpdateFormModal";
import FollowUser from "../Follow/FollowUser";
import ProfileUpdateFormModal_description from "./ProfileUpdateFormModal/profile_description";
import ProfileUpdateFormModal_bio from "./ProfileUpdateFormModal/peofile_bio";
import { thunkGetCurrentQuestion, thunkGetProfileQuestions } from "../../store/question";
import { thunkGetCurrentAnswer, thunkGetProfileAnswers } from "../../store/answer";
import AnswerUpdateFormModal from "../Answers/AnswerUpdateFormModal";
import AnswerDeleteFormModal from "../Answers/AnswerDeleteFormModal";
import QuestionUpdateFormModal from "../Questions/QuestionEditFormModal";
import QuestionDeleteFormModal from "../Questions/QuestionDeleteFormModal";



function ProfilePage_Followers() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const currUser = useSelector((state) => state.session.user)
    // console.log("curruser=======",currUser)
    // console.log("profile=======",profile)
    const profile = useSelector((state) => state.profile)
    const profileArr = Object.values(profile)
    const currProfile = profileArr.find((e) => e.id)
    // console.log("profileArr=======",profileArr)
    console.log("currprofile=======", currProfile)

    const questions = useSelector((state) => state.question)
    const answers = useSelector((state) => state.answer)

    const questionsArr = Object.values(questions)
    const answersArr = Object.values(answers)
    // console.log("questionsArr",questionsArr)
    // console.log("answersArr", answersArr)
    const currQuestions = questionsArr.filter(e => e.userId == id)
    const currAnswers = answersArr.filter(e => e.userId == id)
    // console.log("currQuestions",currQuestions)
    // console.log("currAnswers",currAnswers)
    console.log("currprofile followers", currProfile.followers)
    const currFollowers = currProfile?.followers

    useEffect(() => {
        dispatch(thunkGetProfile(id));
        if (currUser.id == id) {
            dispatch(thunkGetCurrentQuestion())
            dispatch(thunkGetCurrentAnswer())
        }
        else {
            dispatch(thunkGetProfileQuestions(id))
            dispatch(thunkGetProfileAnswers(id))
        }
    }, [dispatch, id])

    return (
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
                        {currUser?.id === currProfile?.id && <div>
                            <ProfileUpdateFormModal currProfile={currProfile} />
                        </div>}
                    </div>
                    {currProfile?.bio && <div className="profile-bio">{currProfile?.bio}</div>}
                    {((currUser?.id == currProfile?.id) && (currProfile?.bio.length === 0)) && <div><ProfileUpdateFormModal_bio currProfile={currProfile} /></div>}
                    <div className="profile-follow">
                        <div>
                            {currProfile?.followers ? currProfile?.followers?.length : "0"} followers &nbsp;·
                        </div>
                        <div>
                            &nbsp;{currProfile?.following ? currProfile?.following?.length : "0"} following
                        </div>
                    </div>
                    {currUser?.id === currProfile?.id ? <div></div>
                        :
                        <div>
                            <FollowUser />
                        </div>}
                </div>
            </div>
            {currProfile?.description && <div className="profile-description-text">{currProfile?.description}</div>}
            {((currUser?.id == currProfile?.id) && (currProfile?.description.length === 0)) && <div className="profile-description-container"><ProfileUpdateFormModal_description currProfile={currProfile} /></div>}
            <div className="profile-bottom">
                <div className="profile-nav">
                    <NavLink to={`/profiles/${id}`} className='profile-navlink'>
                        Profile
                    </NavLink>
                    <NavLink to={`/profiles/${id}/answers`} className='profile-navlink'>
                        {currAnswers?.length ? currAnswers?.length : '0'}&nbsp;{(currAnswers?.length == 0 || currAnswers?.length == 0) ? 'Answer' : 'Answers'}
                    </NavLink>
                    <NavLink to={`/profiles/${id}/questions`} className='profile-navlink'>
                        {currQuestions?.length ? currQuestions?.length : '0'}&nbsp;{(currQuestions?.length == 0 || currQuestions?.length == 0) ? 'Question' : 'Questions'}
                    </NavLink>
                    <NavLink to={`/profiles/${id}/followers`} className='profile-navlink-active'>
                        Followers
                    </NavLink>
                    <NavLink to={`/profiles/${id}/following`} className='profile-navlink'>
                        Following
                    </NavLink>
                </div>
                <div className="profile-bottom-2ndlayer">{currFollowers?.length}&nbsp; {(currFollowers?.length == 0 || currFollowers?.length == 1) ? 'Follower' : 'Followers'}</div>
                <div className="profile-bottom-content-container">
                    {currFollowers &&
                        <div>
                            {currFollowers.map((follower, i) => (

                                <div key={i} className="my_answer_listing_innerbox-profile">

                                    <div >
                                        <NavLink
                                            className="profile-follow-container"
                                            to={`/profiles/${follower?.id}`}>
                                            <img
                                                className="followavatar"
                                                src={follower?.avatar}
                                                alt='pic'
                                                onError={e => { e.currentTarget.src = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"; }}
                                            ></img>
                                            <div className="followusername">{follower?.username}</div>
                                        </NavLink>
                                    </div>
                                </div>
                            ))}
                        </div>}
                    {currFollowers.length != 0 ? <div></div> : <div className="profile-notfound">
                        <img src="https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.dormant_lightmode.png-26-c4532c98034818a0.png"
                            alt="pic"
                            className="profile-notfound-img"
                            onError={e => { e.currentTarget.src = "https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.dormant_lightmode.png-26-c4532c98034818a0.png"; }}
                        ></img>
                        <div className="profile-notfound-text">{currProfile?.username}&nbsp;doesn't have followers yet.</div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage_Followers
