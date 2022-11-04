import React, { useState, useEffect} from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import './ProfileButton.css'

function ProfileButton({ user }) {

    // const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
      };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
          setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

      return(
        <>
            {/* <div className="profile_button" onClick={openMenu}> */}
                <img className="profile_button" onClick={openMenu} src={user?.avatar}
                alt='pic'
                onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}
                ></img>
            {/* </div> */}
            {showMenu &&  (
            <div className="profile-dropdown">

              <div className="menu-item1">
                <img className="profile-dropdown-pic"
                src={user?.avatar}
                alt='pic'
                onError={e => { e.currentTarget.src = "https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg"; }}
                ></img>
                <div className="profile-dropdown-name">{user?.username}</div>
              </div>

              <Link  className="menu-item-link" to={`/myquestions`}><i className="fa-regular fa-rectangle-list fa-lg"></i> &nbsp;My Questions</Link>


              <Link className="menu-item-link" to={`/myanswers`}><i className="fa-regular fa-star fa-lg"></i> &nbsp;My Answers</Link>


              <LogoutButton/>


            </div>
        )
            }

        </>
      )

}



export default ProfileButton;
