
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

const NavBar = () => {
  return (
    <nav className='flex-row'>
      <div>
        <NavLink to='/home' exact={true} activeClassName='active'>
          Home
        </NavLink>
      </div>
      <div>
        <NavLink to='/login' exact={true} activeClassName='active'>
          Login
        </NavLink>
      </div>
      <div>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
      </div>
      <div>
        <LogoutButton />
      </div>
    </nav>
  );
}

export default NavBar;
