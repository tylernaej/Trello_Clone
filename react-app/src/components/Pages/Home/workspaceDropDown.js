import React, { useState, useEffect } from "react";
import './workspaceDropDown.css'
import { NavLink } from "react-router-dom";



function WorkspaceDropDown({url, workspace}) {
    const [dropDown, setDropDown] = useState(false)

    const toggleDropDown = () => {
        setDropDown(current => !current)
    }



    return (
        <div >
            <div>
                <div 
                    id='workspace-title' 
                    onClick={toggleDropDown}
                    style={{backgroundColor: `${dropDown? 'rgb(230, 230, 230)':'white'}`}}
                >
                    <div className='flex-row-align-center'>
                        <div id="nav-first-letter-icon">
                            {workspace.name[0]}
                        </div>
                        {workspace.name}
                    </div>
                    {dropDown && (
                        <div>
                            <i className="fa-solid fa-chevron-up"></i>
                        </div>
                    )}
                    {!dropDown && (
                        <div>
                            <i className="fa-solid fa-chevron-down"></i>
                        </div>
                    )}
                </div>
                {dropDown && (
                    <div id='utilities'>
                        <NavLink to={`${url}/w/${workspace.id}`}>
                            Boards
                        </NavLink>
                        <div>
                            Members
                        </div>
                        <div>
                            Settings
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default WorkspaceDropDown