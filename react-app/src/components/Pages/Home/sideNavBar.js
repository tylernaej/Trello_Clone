import React, { useState, useEffect } from "react";
import { Modal } from '../../../context/Modal';
import HomeCreateWorkspace from "./homeCreateWorkspace";
import WorkspaceDropDown from "./workspaceDropDown";
import './sideNavBar.css'
import { NavLink } from "react-router-dom";


function SideNavBar({url, workSpacesForMap}) {
    const [showModal, setShowModal] = useState(false)

    const handleClick = e => {
        e.preventDefault()
        setShowModal(true)
    }

    return (
        <div id='side-nav-bar'>
            <div className='flex-row' id='workspaces-header'>
                <div id='side-nav-bar-workspaces'>
                    <NavLink to='/home' id='to-home'>
                       Workspaces
                    </NavLink>
                </div>
                <div>
                    <i onClick={handleClick} className="fa-regular fa-square-plus fa-lg"></i>
                    {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <HomeCreateWorkspace setShowModal={setShowModal} />
                    </Modal>
                    )}
                </div>
            </div>
            <div>
                {workSpacesForMap.map(workspace => (
                    <div id='workspace-instance'>
                        <WorkspaceDropDown url={url} workspace={workspace}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SideNavBar