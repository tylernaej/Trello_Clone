import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './profileButton.css'
import ProfileDropDownInfo from "./profileDropDownInfo";
import profileImage from '../../../assets/default-user.jpg'


function ProfileButton() {
    
    const sessionUser = useSelector(state => state.session.user)
    const [menu, setMenu] = useState(false)

    function toggleMenu(e){
        setMenu(current => !current) 
    }

    useEffect(() => {
        const closeMenu = () => {
            if(menu){
                setMenu(false)
            }
        }
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener('click', closeMenu)
    }, [menu])

  return (
    <div id='profile-wrapper'>
        {sessionUser && ( 
            <div id='profile-wrapper'>
                <div id='meet-the-dev'>
                    <div id='meet-the-dev-text'>
                        Meet the Dev
                    </div>
                    <div id='external-links'>
                        <div id='nav-github-link'><a style={{textDecoration:"none", color: "white"}} href="https://github.com/tylernaej" target="_blank" rel="noreferrer noopener"><i className="fa-brands fa-github fa-lg"/></a></div>
                        <div id='nav-linkedin-link'><a style={{textDecoration:"none", color: "white"}} href='https://www.linkedin.com/' target="_blank" rel="noreferrer noopener"><i className="fa-brands fa-linkedin fa-lg"/></a></div>  
                    </div>
                </div> 
                <div><a id='about-link' href="https://github.com/tylernaej/Trello_Clone" target="_blank" rel="noreferrer noopener">About</a></div>
                <div onClick={(e) => toggleMenu(e)} className='' id='profile-image-wrapper'>
                    <img id='profile-image' src={profileImage} />
                </div>
                {menu && (
                    <div id='utility-drop-down'>
                        <ProfileDropDownInfo sessionUser={sessionUser}/>
                    </div>
                )}
            </div>
        )
        }
        {!sessionUser && (
            <div className="flex-row" id='profile-wrapper'>
                <div id='meet-the-dev'>
                    <div id='meet-the-dev-text'>
                        Meet the Dev
                    </div>
                    <div id='external-links'>
                        <div id='nav-github-link'><a style={{textDecoration:"none", color: "white"}} href="https://github.com/tylernaej" target="_blank" rel="noreferrer noopener"><i className="fa-brands fa-github fa-lg"/></a></div>
                        <div id='nav-linkedin-link'><a style={{textDecoration:"none", color: "white"}} href='https://www.linkedin.com/' target="_blank" rel="noreferrer noopener"><i className="fa-brands fa-linkedin fa-lg"/></a></div>  
                    </div>
                </div> 
                <div><a id='about-link' href="https://github.com/tylernaej/Trello_Clone" target="_blank" rel="noreferrer noopener">About</a></div>
                <div id='login-container'>
                    <NavLink 
                        to='/login'
                        id='login-button'
                    >
                        Log In
                    </NavLink>
                </div>
                <div id='signup-container'>
                    <NavLink 
                        to='/sign-up'
                        id='signup-button'
                    >
                        Sign Up
                    </NavLink>
                </div>
            </div>
        )}
    </div>
  )
}

export default ProfileButton;