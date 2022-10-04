import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBoardsOfWorkspaceThunk } from "../../../store/activeWorkspace";
import { useParams, NavLink } from "react-router-dom";
import WorkspaceBoardCard from "./workspaceBoardCard";
import WorkspaceCreateBoard from "./workspaceCreateBoard";
import { Modal } from '../../../context/Modal'
import WorkspaceEdit from "./workspaceEdit";
import './workspace.css'

function Workspace() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const sessionUser = useSelector(state => state.session.user)
    const workspaces = useSelector(state => state.workspaces)
    const workspace = useSelector(state => state.activeWorkspace.workspace)
    const idFromParams = useParams()
    const id = idFromParams.workspaceId
    const [showModal, setShowModal] = useState(false)
    const [editWorkspace, setEditWorkspace] = useState(false)

    console.log(id)

    const handleClickNewBoard = e => {
        e.preventDefault()
        setShowModal(true)
    }

    const handleClickEditWorkspace = e => {
        e.preventDefault()
        setEditWorkspace(true)
    }

    useEffect(() => {
        dispatch(getAllBoardsOfWorkspaceThunk(id))
        .then(() => setIsLoaded(true))
    }, [dispatch, id])

    console.log(workspace)

    return isLoaded && (
        <div id='workspace-exterior-container'>
            <div id='workspace-interior-container'>
                <div id='workspace-title'>
                    {!editWorkspace && (
                        <div id='title-bar'>
                            <div id='workspace-name'>
                                <div id="first-letter-icon">
                                    {workspace.name[0]}
                                </div>
                                {workspace.name}
                            </div>
                            <div>
                                {editWorkspace && (
                                    <div onClick={() => setEditWorkspace(false)}>
                                        <i class="fa-solid fa-chevron-up"></i>
                                    </div>
                                )}
                                {!editWorkspace && (
                                    <div onClick={() => setEditWorkspace(true)}>
                                        <i className="fa-solid fa-chevron-down"></i>
                                    </div>
                                )}
                            </div>
                        </div>
                        )}
                    {editWorkspace && (
                        <WorkspaceEdit sessionUser={sessionUser} workspace={workspace} setEditWorkspace={setEditWorkspace}/>
                    )}
                </div>
                <div className="flex-row">
                    <div id='board-map' className="flex-row">
                        {workspace.boards.map(board => (
                            <WorkspaceBoardCard 
                                key={board.id} 
                                workspaceId={workspace.id} 
                                board={board}
                            />
                        ))}
                    </div>
                    <div>
                        <button onClick={handleClickNewBoard}>Create New Board</button>
                        {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <WorkspaceCreateBoard setShowModal={setShowModal} workspaceId={workspace.id}/>
                        </Modal>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workspace