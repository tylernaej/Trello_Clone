import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getCurrentUserWorkspacesThunk} from '../../../store/workspace'
import HomeWorkSpaceCard from "./homeWorkSpaceCard";
import { Modal } from '../../../context/Modal'
import HomeCreateWorkspace from "./homeCreateWorkspace";
import './home.css'

function Home() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const workspaces = useSelector(state => state.workspaces)
    const [workSpacesForMap, setWorkSpacesForMap] = useState([])
    const [showModal, setShowModal] = useState(false)

    const handleClick = e => {
        e.preventDefault()
        setShowModal(true)
    }

    useEffect(() => {
        dispatch(getCurrentUserWorkspacesThunk())
        .then(() => setIsLoaded(true))
    }, [dispatch])

    

    useEffect(() =>{
        let workspacesArray = []
        for (const workspace of Object.values(workspaces)){
            workspacesArray.push(workspace)
        }
        setWorkSpacesForMap(workspacesArray)
    }, [workspaces])

    return isLoaded && (
        <div id='home-container'>
            <div id='content-container'>
                <div id='side-nav-bar-container'>
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
                    </div>
                </div>
                <div id='main-content-container'>
                    Main Content Here
                    <div>
                        <div id='your-workspaces'>
                            Your Workspaces:
                        </div>
                        <div className="flex-column">
                            {workSpacesForMap.map(workspace => (
                                <HomeWorkSpaceCard key={workspace.id} workspace={workspace}/>       
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
