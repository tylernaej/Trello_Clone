import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './workspaceDropDown.css'
import { NavLink } from "react-router-dom";
import { Modal } from '../../../context/Modal'
import WorkspaceEditModal from "../WorkSpace/workspaceEditModal";




function WorkspaceDropDown({url, workspace}) {
    const [dropDown, setDropDown] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [editWorkspace, setEditWorkspace] = useState(false)
    const sessionUser = useSelector(state => state.session.user)



    const toggleDropDown = () => {
        setDropDown(current => !current)
    }

    const handleMouseEnter = () => {
        setIsHovering(true);
    };
    
      const handleMouseLeave = () => {
        setIsHovering(false);
    };

    return (
        <div >
            <div>
                <div 
                    id='workspace-title' 
                    onClick={toggleDropDown}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{backgroundColor: `${isHovering || dropDown? 'rgb(230, 230, 230)':'white'}`}}
                >
                    <div className='flex-row-align-center'>
                        <div id="nav-first-letter-icon">
                            {workspace.name[0]}
                        </div>
                        <div className="flex-row-align-center" id='name-name'>
                            {workspace.name}
                        </div>
                    </div>
                    <div>
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
                </div>
                {dropDown && (
                    <div id='utilities'>
                        <NavLink to={`${url}/w/${workspace.id}`}>
                            Boards
                        </NavLink>
                        {/* <div>
                            Members
                        </div> */}
                        <div 
                            onClick={() => setEditWorkspace(true)}  
                            id='settings-sidebar-button'
                        >
                            <div >
                                Settings
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div>
                {editWorkspace && (
                    <Modal>
                        <WorkspaceEditModal sessionUser={sessionUser} workspace={workspace} setEditWorkspace={setEditWorkspace}/>
                    </Modal>
                )}
            </div>
        </div>
    )
}

export default WorkspaceDropDown