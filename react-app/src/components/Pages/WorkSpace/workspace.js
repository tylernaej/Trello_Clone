import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBoardsOfWorkspaceThunk } from "../../../store/activeWorkspace";
import { useParams } from "react-router-dom";
import WorkspaceBoardCard from "./workspaceBoardCard";
import WorkspaceCreateBoard from "./workspaceCreateBoard";
import { Modal } from '../../../context/Modal'
import WorkspaceEdit from "./workspaceEdit";

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
    }, [dispatch])

    return isLoaded && (
        <div>
            <div>
                {!editWorkspace && (
                    <div>
                        {workspace.name}
                        <div onClick={handleClickEditWorkspace}>
                            <div>Icon</div>
                        </div>
                    </div>
                )}
                {editWorkspace && (
                    <WorkspaceEdit sessionUser={sessionUser} workspace={workspace} setEditWorkspace={setEditWorkspace}/>
                )}
            </div>
            <div>
                {workspace.boards.map(board => (
                    <WorkspaceBoardCard key={board.id} workspaceId={workspace.id} board={board}/>
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
    )
}

export default Workspace