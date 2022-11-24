import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { thunkUserFollow, thunkUserUnfollow } from "../../store/follow";
import { thunkGetProfile } from "../../store/profile";


function FollowUser() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const profile= useSelector((state) => state.profile)
    const profileArr= Object.values(profile)
    const currProfile = profileArr.find((e) => e.id)
    // console.log("followprofile", currProfile)
    // console.log("followingprofile", currProfile?.following)
    console.log("followerprofile", currProfile?.followers)
    const currUser = useSelector((state) => state.session.user)
    // console.log("checkcurruser", currUser?.id)
    const [following, setFollowing] = useState(false)


    useEffect(() => {
        currProfile?.followers.forEach((follower) => {
          console.log("testing useeffect",follower);
          let followerId = follower.id;
          if (currUser.id === followerId) {
            setFollowing(true);
          }
        });
      }, [currProfile?.followers]);

      useEffect(() => {
        dispatch(thunkGetProfile(id));
    }, [dispatch, id])

    const handleFollow = async (e) => {
        e.preventDefault();
        let followUser = await dispatch(thunkUserFollow(currProfile?.id));
        if (followUser) {

            dispatch(thunkGetProfile(currProfile?.id));

        }
        setFollowing(true);
      };

      const handleUnfollow = async (e) => {
        e.preventDefault();
        let unfollowUser = await dispatch(thunkUserUnfollow(currProfile?.id));
        if (unfollowUser) {

            dispatch(thunkGetProfile(currProfile?.id));

        }
        setFollowing(false);
      };



    return (
        <div>
            {following ? (
        <button className="unfollowButton" onClick={handleUnfollow}>
          Unfollow
        </button>
      ) : (
        <button className="followButton" onClick={handleFollow}>
          Follow
        </button>
      )}

        </div>
    )

}

export default FollowUser;
