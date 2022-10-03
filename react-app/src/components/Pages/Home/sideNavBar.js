import React, { useState, useEffect } from "react";
import { Modal } from '../../../context/Modal';
import HomeCreateWorkspace from "./homeCreateWorkspace";
import WorkspaceDropDown from "./workspaceDropDown";


function SideNavBar({url, workSpacesForMap}) {
    const [showModal, setShowModal] = useState(false)

    const handleClick = e => {
        e.preventDefault()
        setShowModal(true)
    }

    return (
        <div id='side-nav-bar'>
            Side Nav Bar Here
            <div className='flex-row' id='workspaces-header'>
                <div id='side-nav-bar-workspaces'>
                    Workspaces
                </div>
                <div>
                    <button onClick={handleClick}>+</button>
                    {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <HomeCreateWorkspace setShowModal={setShowModal} />
                    </Modal>
                    )}
                </div>
            </div>
            <div>
                {workSpacesForMap.map(workspace => (
                    <div>
                        <WorkspaceDropDown url={url} workspace={workspace}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SideNavBar