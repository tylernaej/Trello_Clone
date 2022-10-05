import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBoardsOfWorkspaceThunk } from "../../../store/activeWorkspace";
import { useParams, NavLink } from "react-router-dom";
import WorkspaceBoardCard from "./workspaceBoardCard";
import WorkspaceCreateBoard from "./workspaceCreateBoard";
import { Modal } from '../../../context/Modal'
import WorkspaceEdit from "./workspaceEdit";
import './workspace.css'
import WorkspaceEditModal from "./workspaceEditModal";

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
    const [deleteWorkspace, setDeleteWorkspace] = useState(false)

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
                <div id='workspace-header'>
                    <div id='title-bar'>
                        <div id='workspace-name'>
                            <div id="first-letter-icon">
                                {workspace.name[0]}
                            </div>
                            {workspace.name}
                        </div>
                    </div>
                    <div 
                        onClick={() => setEditWorkspace(true)}  
                        id='settings-button'
                    >
                        <div >
                            Settings
                        </div>
                        <i className="fa-solid fa-gear fa-sm"></i>
                    </div>
                    <div 
                        onClick={handleClickNewBoard}
                        id='create-button'
                    >
                        <div>
                            New Board
                        </div>
                        <i className="fa-solid fa-plus"></i>
                    </div>
                    <div 
                        onClick={(() => setDeleteWorkspace(true))}
                        id='delete-button'
                    >
                        <div>
                            Delete Workspace
                        </div>
                        <i class="fa-solid fa-trash fa-sm"></i>
                    </div>
                </div>
                <div id='dropdown-area'>
                    {deleteWorkspace && (
                        <div>
                            <div>
                                Are you sure you want to delete {workspace.name}?
                            </div>
                        </div>
                    )}
                    {editWorkspace && (
                        <Modal>
                            <WorkspaceEditModal sessionUser={sessionUser} workspace={workspace} setEditWorkspace={setEditWorkspace}/>
                        </Modal>
                    )}
                    {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <WorkspaceCreateBoard 
                            setShowModal={setShowModal} 
                            workspaceId={workspace.id}
                        />
                    </Modal>
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
                </div>
            </div>
        </div>
    )
}

export default Workspace