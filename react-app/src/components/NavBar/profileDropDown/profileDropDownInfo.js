import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../../auth/LogoutButton";
import  './profileDropDownInfo.css'

function ProfileDropDownInfo({sessionUser}) {
  return (
    <div id='dropdown-container'>
        <div className="flex-row-align-center" id='welcome'>
            Welcome, {sessionUser.username}
        </div>
        <div id='utilities-dropdown'>
            <div id='u-d-grid'>
                <i className="fa-regular fa-envelope" id='top-icon'></i>
                <div id='top-text'>{sessionUser.email}</div>
            </div>
            <div className="flex-row" id='logout-wrapper'>
                <LogoutButton id='bottom-text'/>
            </div>
        </div>
    </div>
  )
}

export default ProfileDropDownInfo;