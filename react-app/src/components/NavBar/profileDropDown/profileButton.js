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
    <div>
        {sessionUser && ( 
            <div>
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
            <div className="flex-row"> 
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