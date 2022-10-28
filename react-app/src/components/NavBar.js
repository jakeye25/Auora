
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
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

          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>

          <LogoutButton />

    </nav>
  );
}

export default NavBar;
