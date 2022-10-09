import React, { useState, useEffect } from "react";
import { Modal } from '../../../context/Modal';
import HomeCreateWorkspace from "./homeCreateWorkspace";
import WorkspaceDropDown from "./workspaceDropDown";
import './sideNavBar.css'
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";


function SideNavBar({url, workSpacesForMap}) {
    const [showModal, setShowModal] = useState(false)
    const history = useHistory()
    const [welcomeMessage, setWelcomeMessage] = useState(false)

    useEffect(() => {
        if(workSpacesForMap?.length === 0){
            const button = document.getElementById('create-new-workspace')
            if(button){
                button.click()
                setWelcomeMessage(true)
            }
        }
        if(workSpacesForMap?.length >0) {
            setWelcomeMessage(false)
        }
    }, [workSpacesForMap]);


    const handleClick = e => {
        e.preventDefault()
        setShowModal(true)
    }

    const sendHome = e => {
        history.push('/home')
    }

    return (
        <div id='side-nav-bar'>
            <div className='flex-row' id='workspaces-header'>
                <div id='side-nav-bar-workspaces' onClick={sendHome}>
                    <div id='to-home'>
                       Workspaces
                    </div>
                </div>
                <div>
                    <i onClick={handleClick} className="fa-regular fa-square-plus fa-lg" id='create-new-workspace'></i>
                    {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <HomeCreateWorkspace setShowModal={setShowModal} welcomeMessage={welcomeMessage} />
                    </Modal>
                    )}
                </div>
            </div>
            <div>
                {workSpacesForMap.map(workspace => (
                    <div id='workspace-instance'>
                        <WorkspaceDropDown key={workspace.id} url={url} workspace={workspace}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SideNavBar