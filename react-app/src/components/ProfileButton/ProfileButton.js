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
            <div className="profile_button" onClick={openMenu}>
                <i className="fas fa-user-circle fa-2x" />
            </div>
            {showMenu &&  (
            <div className="profile-dropdown">

            <div className="menu-item1">&nbsp;<i className="fas fa-user-circle fa-lg" /> &nbsp;Hi, {user.username}</div>

            <Link  className="menu-item-link" to={`/myquestions`}><i className="fa-regular fa-rectangle-list fa-lg"></i> &nbsp;My Questions</Link>


            <Link className="menu-item-link" to={`/myanswers`}><i className="fa-regular fa-star fa-lg"></i> &nbsp;My Answers</Link>

            <div className="menu-item"  >
                <LogoutButton/>
            </div>

            </div>
        )
            }

        </>
      )

}



export default ProfileButton;
