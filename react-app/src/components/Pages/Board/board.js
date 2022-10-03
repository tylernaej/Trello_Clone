import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {getAllBoardsOfWorkspaceThunk} from '../../../store/activeWorkspace'
import {getAllWorkspacesThunk} from '../../../store/workspace'
import BoardListCard from "./boardListCard";
import { Modal } from '../../../context/Modal'
import BoardCreateList from './boardCreateList'
import BoardEditTitle from "./editBoardInfo/editBoardTitle";
import './board.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

function Board() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const workspace = useSelector(state => state.activeWorkspace.workspace)
    const idFromParams = useParams()
    const boardId = Number(idFromParams.boardId)
    const workspaceId = Number(idFromParams.workspaceId)
    const activeBoard = useSelector(state => state.activeWorkspace.workspace?
                                    state.activeWorkspace.workspace.boards.find(board => board.id === boardId)
                                    : null)
    const [addList, setAddList] = useState(false)
    const titleSelected = activeBoard? activeBoard.title : null
    const [changeTitle, setChangeTitle] = useState(false)
    const [finishedDelete, setFinishedDelete] = useState(true)

    const handleClick = e => {
        e.preventDefault()
        setAddList(true)
    }

    useEffect(() => {
        dispatch(getAllBoardsOfWorkspaceThunk(workspaceId))
        .then(() => setIsLoaded(true))
    }, [dispatch])

    if(!activeBoard){
        return (
            <div>That board doesn't exist for this workspace!</div>
        )
    }

    return isLoaded && finishedDelete && (
        <div id='board-page-wrapper'>
            <div id='interior-container'>
                <div id='title-display'>
                    {!changeTitle && (
                        <div onClick={(e => setChangeTitle(true))}>
                            {titleSelected}
                        </div>
                    )}
                    {changeTitle && (
                        <BoardEditTitle titleSelected={titleSelected} board={activeBoard} changeTitle={changeTitle} setChangeTitle={setChangeTitle}/>
                    )}
                </div>
                <div id='list-container'>
                    <div id='lists-map'>
                        {activeBoard.lists.map(list => (
                            <BoardListCard key={list.id} list={list} finishedDelete={finishedDelete} setFinishedDelete={setFinishedDelete}/>
                        ))}
                    </div>
                    <div id='add-list-button'>
                        {!addList && (
                            <button onClick={handleClick}>Add New List</button>
                        )}
                        {addList && (
                            <BoardCreateList setAddList={setAddList} boardId={activeBoard.id}/>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Board