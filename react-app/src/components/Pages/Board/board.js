import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {getAllBoardsOfWorkspaceThunk} from '../../../store/activeWorkspace'
import {getAllWorkspacesThunk} from '../../../store/workspace'

function Board() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [activeBoard, setActiveBoard] = useState(null)
    const workspace = useSelector(state => state.activeWorkspace.workspace)
    const idFromParams = useParams()
    const boardId = idFromParams.boardId
    const workspaceId = idFromParams.workspaceId

    useEffect(() => {
        dispatch(getAllBoardsOfWorkspaceThunk(workspaceId))
        .then((workspace) => setActiveBoard(workspace.boards.find(board => board.id === parseInt(boardId))))
        .then(() => setIsLoaded(true))
    }, [dispatch])

    if(!activeBoard){
        return (
            <div>That board doesn't exist for this workspace!</div>
        )
    }

    return isLoaded && activeBoard && (
        <div>
            Single Board Here
            {activeBoard.title}
        </div>
    )
}

export default Board