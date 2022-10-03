import React, { useState, useEffect } from "react";
import './workspaceDropDown.css'
import { NavLink } from "react-router-dom";



function WorkspaceDropDown({url, workspace}) {
    const [dropDown, setDropDown] = useState(false)



    return (
        <div >
            <div>
                <div id='workspace-title'>
                    {workspace.name}
                    {dropDown && (
                        <div onClick={() => setDropDown(false)}>
                            <i class="fa-solid fa-chevron-up"></i>
                        </div>
                    )}
                    {!dropDown && (
                        <div onClick={() => setDropDown(true)}>
                            <i className="fa-solid fa-chevron-down"></i>
                        </div>
                    )}
                </div>
                {dropDown && (
                    <div>
                        <NavLink to={`${url}/w/${workspace.id}`}>
                            Boards
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    )
}

export default WorkspaceDropDown