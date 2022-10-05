import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {deleteBoardThunk, getAllBoardsOfWorkspaceThunk} from '../../../store/activeWorkspace'
import {getAllWorkspacesThunk} from '../../../store/workspace'
import BoardListCard from "./boardListCard";
import { Modal } from '../../../context/Modal'
import BoardCreateList from './boardCreateList'
import BoardEditTitle from "./editBoardInfo/editBoardTitle";
import './board.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'


function Board() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoaded, setIsLoaded] = useState(false)
    const workspace = useSelector(state => state.activeWorkspace.workspace)
    const idFromParams = useParams()
    const boardId = Number(idFromParams.boardId)
    const workspaceId = Number(idFromParams.workspaceId)
    const activeBoard = useSelector(state => state.activeWorkspace.workspace?
                                    state.activeWorkspace.workspace.boards.find(board => board?.id === boardId)
                                    : null)
    const [addList, setAddList] = useState(false)
    const titleSelected = activeBoard? activeBoard.title : null
    const [changeTitle, setChangeTitle] = useState(false)
    const [finishedDelete, setFinishedDelete] = useState(true)
    const [editBoard, setEditBoard] = useState(false)

    const handleClick = e => {
        e.preventDefault()
        setAddList(true)
    }
    console.log(idFromParams)

    const handleBoardDelete = async e => {
        e.preventDefault()
        const data = await dispatch(deleteBoardThunk(activeBoard.id))
        .then(() => setEditBoard(false))
        
        history.push('/home')
        
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
        <div id='board-page-wrapper' style={{backgroundColor: `#${activeBoard.backgroundColor}`}}>
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
                    <div>
                        {!editBoard && (
                            <div onClick={(e) => setEditBoard(true)}>
                                Settings
                                <i className="fa-solid fa-gear"></i>
                            </div>
                        )}
                        {editBoard && (
                            <div onClick={(e) => setEditBoard(false)}>
                                <i className="fa-solid fa-chevron-up"></i>
                            </div>
                        )}
                    </div>
                    {editBoard && (
                        <div>
                            <div onClick={handleBoardDelete}>Delete</div>
                        </div>
                    )}
                </div>
                <div id='list-container'>
                    <div id='lists-map'>
                        {activeBoard.lists.map(list => (
                            <BoardListCard 
                                key={list.id} 
                                lists={activeBoard.lists}
                                list={list} 
                                finishedDelete={finishedDelete} 
                                setFinishedDelete={setFinishedDelete}
                            />
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