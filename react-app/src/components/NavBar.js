
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import ProfileButton from './ProfileButton/ProfileButton';
import QuestionCreateFormModal from './Questions/QuestionCreateFormModal';

const NavBar = () => {
    const history = useHistory()
    const user=useSelector((state) => state.session.user)

    if(!user) history.push('/')
  return (
    <nav id='navbar-container'>

          <NavLink to='/home' exact={true} activeClassName='active'>
            <img
            src='https://user-images.githubusercontent.com/77218939/199653992-2418c7c2-000d-4fcb-a662-a1055468dba6.png'
            alt='pic'></img>
          </NavLink>

          <NavLink to='/home' exact={true} activeClassName='active'>
            <i class="fa-solid fa-house fa-xl"></i>
          </NavLink>

          <NavLink to='/answers' exact={true} activeClassName='active'>
            <i class="fa-regular fa-pen-to-square fa-xl"></i>
          </NavLink>

          {/* <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink> */}

          <div>
            <ProfileButton user={user}/>
          </div>

          <div>
            <QuestionCreateFormModal/>
          </div>
    </nav>
  );
}

export default NavBar;
