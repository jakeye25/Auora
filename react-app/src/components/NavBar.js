
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import ProfileButton from './ProfileButton';
import QuestionCreateFormModal from './Questions/QuestionCreateFormModal';

const NavBar = () => {
    const history = useHistory()
    const user=useSelector((state) => state.session.user)

    if(!user) history.push('/')
  return (
    <nav id='navbar-container'>

          <NavLink to='/home' exact={true} activeClassName='active'>
            Auora
          </NavLink>

          <NavLink to='/home' exact={true} activeClassName='active'>
            <i class="fa-solid fa-house"></i>
          </NavLink>

          <NavLink to='/answers' exact={true} activeClassName='active'>
            <i class="fa-regular fa-pen-to-square"></i>
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
