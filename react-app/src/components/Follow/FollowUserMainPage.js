import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { thunkUserFollow, thunkUserUnfollow } from "../../store/follow";
import { thunkGetProfile } from "../../store/profile";
import { thunkGetAllQuestion } from "../../store/question";
import './FollowUserMainPage.css'

function FollowUserMainPage({question}) {
    // const { id } = useParams()
    const dispatch = useDispatch()
    const profile= useSelector((state) => state.profile)
    const profileArr= Object.values(profile)
    const currProfile = profileArr.find((e) => e.id)
    // console.log("followprofile", currProfile)
    // console.log("followingprofile", currProfile?.following)
    // console.log("followerprofile", currProfile?.followers)
    const currUser = useSelector((state) => state.session.user)
    // console.log("checkcurruser", currUser?.id)
    const [following, setFollowing] = useState(false)


    useEffect(() => {
        question?.followers.forEach((followerId) => {
          // console.log("testing useeffect",follower);
          // let followerId = follower.id;
          if (currUser.id === followerId) {
            setFollowing(true);
          }
        });
      }, [question?.followers]);

    //   useEffect(() => {
    //     dispatch(thunkGetProfile(id));
    // }, [dispatch, id])

    const handleFollow = async (e) => {
        e.preventDefault();
        let followUser = await dispatch(thunkUserFollow(question?.userId))
        .then(dispatch(thunkGetAllQuestion()));
        // if (followUser) {

        //     dispatch(thunkGetAllQuestion());

        // }
        setFollowing(true);
      };

      const handleUnfollow = async (e) => {
        e.preventDefault();
        let unfollowUser = await dispatch(thunkUserUnfollow(question?.userId))
        .then(dispatch(thunkGetAllQuestion()));
        // if (unfollowUser) {

        //     dispatch(thunkGetAllQuestion());

        // }
        setFollowing(false);
      };



    return (
        <div>
            {following ? (

        <div className="unfollowButton-MainPage" onClick={handleUnfollow}>
          Following
        </div>
      ) : (
        <div className="followButton-MainPage" onClick={handleFollow}>
          Follow
        </div>
      )}

        </div>
    )

}

export default FollowUserMainPage;
