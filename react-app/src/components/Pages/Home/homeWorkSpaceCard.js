import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeBoardCard from "./homeBoardCard";
import { Modal } from '../../../context/Modal'
import HomeCreateBoard from "./homeCreateBoard";
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import './homeWorkSpaceCard.css'
import WorkspaceEditModal from "../WorkSpace/workspaceEditModal";
import { deleteWorkspaceFromWorkspacesThunk } from "../../../store/workspace";

function HomeWorkSpaceCard({workspace}) {
    const history = useHistory()
    const dispatch = useDispatch()
    const [wSBoards, setWSBoards] = useState(workspace.boards)
    const [showModal, setShowModal] = useState(false)
    const [editWorkspace, setEditWorkspace] = useState(false)
    const sessionUser = useSelector(state => state.session.user)
    const [deleteWorkspace, setDeleteWorkspace] = useState(false)
    const [deleteName, setDeleteName] = useState("")
  
    const handleClick = e => {
        e.preventDefault()
        setShowModal(true)
    }

    const handleDeleteWorkspace = async e => {
        e.preventDefault()
        let workspaceId = workspace.id
        await dispatch(deleteWorkspaceFromWorkspacesThunk(workspaceId))
    }

    let members = workspace.users.length === 1?'Member':'Members'

    return (
        <div id='workspace-exterior-container'>
            <div id='workspace-interior-container'>
                <div className="flex-row">
                    <div id='workspace-link'>
                        <NavLink 
                            to={`/home/w/${workspace.id}`}
                            style={{textDecoration: 'none'}}
                        >
                            <div id='workspace-name'>
                                <div id="first-letter-icon">
                                    {workspace.name[0]}
                                </div>
                                {workspace.name}
                            </div>
                        </NavLink>
                    </div>
                    <div id='boards-button'>
                        <NavLink
                            to={`/home/w/${workspace.id}`}
                            style={{
                                textDecoration: 'none',
                                color: 'rgb(50, 50, 50)',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }} 
                        >
                            <div>
                                Boards
                            </div>
                            <i className="fa-solid fa-table-columns fa-sm"></i>
                        </NavLink>
                    </div>
                    <div id='members-button'>
                        <div >
                            {workspace.users.length} {members}
                        </div>
                        <i className="fa-solid fa-users fa-sm"></i>
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
                    {editWorkspace && (
                        <Modal>
                            <WorkspaceEditModal sessionUser={sessionUser} workspace={workspace} setEditWorkspace={setEditWorkspace}/>
                        </Modal>
                    )}
                    <div 
                        onClick={handleClick}
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
                        <i className="fa-solid fa-trash fa-sm"></i>
                    </div>               
                </div>
                <div id='dropdown-area'>
                    {deleteWorkspace && (
                        <div>
                            <div>
                                <div>
                                    To permanently delete this workspace, type in the full name:
                                </div>
                                <form>
                                    <input 
                                        name="title"
                                        value={deleteName}
                                        onChange={(e) => setDeleteName(e.target.value)}
                                    />
                                </form>
                            </div>
                            <div className="flex-row">
                                <div 
                                    onClick={() => setDeleteWorkspace(false)}
                                    id='cancel-button'
                                >
                                    Cancel
                                </div>
                                {workspace.name === deleteName && (
                                    <div
                                        id='confirm-delete-button'
                                        onClick={handleDeleteWorkspace}
                                    >
                                        Delete
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <HomeCreateBoard 
                            setShowModal={setShowModal} 
                            workspaceId={workspace.id}
                        />
                    </Modal>
                    )}  
                </div>
                <div className="flex-row">
                    <div id='board-map' className="flex-row">
                        {wSBoards.map(board => (
                            <HomeBoardCard 
                                key={board.id} 
                                board={board} 
                                workspaceId={workspace.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeWorkSpaceCard