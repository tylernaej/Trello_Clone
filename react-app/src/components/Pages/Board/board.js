import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {getAllBoardsOfWorkspaceThunk} from '../../../store/activeWorkspace'
import {getAllWorkspacesThunk} from '../../../store/workspace'
import BoardListCard from "./boardListCard";
import { Modal } from '../../../context/Modal'
import BoardCreateList from './boardCreateList'

function Board() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [activeBoard, setActiveBoard] = useState(null)
    const workspace = useSelector(state => state.activeWorkspace.workspace)
    const idFromParams = useParams()
    const boardId = idFromParams.boardId
    const workspaceId = idFromParams.workspaceId
    const [addList, setAddList] = useState(false)

    const handleClick = e => {
        e.preventDefault()
        setAddList(true)
    }

    useEffect(() => {
        dispatch(getAllBoardsOfWorkspaceThunk(workspaceId))
        .then((workspace) => workspace.boards ? setActiveBoard(workspace.boards.find(board => board.id === parseInt(boardId))) : setActiveBoard(null))
        .then(() => setIsLoaded(true))
    }, [dispatch])

    if(!activeBoard){
        return (
            <div>That board doesn't exist for this workspace!</div>
        )
    }

    return isLoaded && activeBoard && (
        <div>
            {activeBoard.title}
            <div>
                {activeBoard.lists.map(list => (
                    <BoardListCard key={list.id} list={list}/>
                ))}
            </div>
            <div>
                {!addList && (
                    <button onClick={handleClick}>Add New List</button>
                )}
                {addList && (
                    <BoardCreateList setAddList={setAddList} boardId={activeBoard.id}/>
                )}
            </div>
        </div>
    )
}

export default Board