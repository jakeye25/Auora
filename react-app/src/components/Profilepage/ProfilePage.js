import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import './ProfilePage.css'
import { thunkGetProfile } from "../../store/profile";

function ProfilePage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const profile= useSelector((state) => state.profile)
    const currUser= useSelector((state) => state.session.user)
    console.log("profile=======",profile)
    const profileArr= Object.values(profile)
    console.log("profileArr=======",profileArr)
    const currProfile = profileArr.find((e) => e.id)
    console.log("currprofile=======",currProfile)
    useEffect(() => {
        dispatch(thunkGetProfile(id));
    }, [dispatch, id])

    return(
        <div className="profilecontainer">
            <div className="profile-top">
                <img

                    src={currProfile?.avatar}
                    alt='pic'
                    onError={e => { e.currentTarget.src = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"; }}
                ></img>
                <div className="profile-topright">
                    <div className="profile-topusername">
                        {currProfile?.username}
                    </div>
                    <div className="profile-follow">
                        <div>
                            {currProfile?.followers? currProfile?.followers?.length : "0" } followers &nbsp;·
                        </div>
                        <div>
                        &nbsp;{currProfile?.following? currProfile?.following?.length : "0" } following
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProfilePage
