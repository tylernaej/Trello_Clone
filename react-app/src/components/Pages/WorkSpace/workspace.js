import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBoardsOfWorkspaceThunk } from "../../../store/activeWorkspace";
import { useParams } from "react-router-dom";
import WorkspaceBoardCard from "./workspaceBoardCard";
import WorkspaceCreateBoard from "./workspaceCreateBoard";
import { Modal } from '../../../context/Modal'

function Workspace() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const workspaces = useSelector(state => state.workspaces)
    const workspace = useSelector(state => state.activeWorkspace.workspace)
    const idFromParams = useParams()
    const id = idFromParams.workspaceId
    const [showModal, setShowModal] = useState(false)

    const handleClick = e => {
        e.preventDefault()
        setShowModal(true)
    }

    useEffect(() => {
        dispatch(getAllBoardsOfWorkspaceThunk(id))
        .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <div>
            Single Workspace Page Here
            <div>{workspace.name}</div>
            <div>
                {workspace.boards.map(board => (
                    <WorkspaceBoardCard workspaceId={workspace.id} board={board}/>
                ))}
            </div>
            <div>
                <button onClick={handleClick}>Create New Board</button>
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