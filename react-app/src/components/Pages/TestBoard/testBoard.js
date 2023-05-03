import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {deleteBoardThunk, getAllBoardsOfWorkspaceThunk} from '../../../store/activeWorkspace'
import {getAllWorkspacesThunk} from '../../../store/workspace'
import BoardListCard from '../Board/boardListCard'
import { Modal } from '../../../context/Modal'
import BoardCreateList from '../Board/boardCreateList'
import BoardEditTitle from "../Board/editBoardInfo/editBoardTitle";
import ResourceDoesntExist from "../404/resourceDoesntExist";
import TestList from "./testList";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function TestBoard() {
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
    const sessionUser = useSelector(state => state.session.user)
    const workspaceUsers = useSelector(state => state.activeWorkspace?.workspace?.users)
    const [notAuthorized, setNotAuthorized] = useState(false)
 
    useEffect(() => {
        if(activeBoard?.lists?.length === 0){
            const button = document.getElementById('add-list-board-button')
            if(button){
                button.click()
            }
        }
    }, [isLoaded]);

    useEffect(() => {
        if(workspaceUsers && sessionUser){
            let matched = false
            for(const user of workspaceUsers){
                if (user.id === sessionUser.id){
                    matched = true
                }
            }
            if(!matched){
                setNotAuthorized(true)
            }
        }
    }, [workspaceUsers, sessionUser])

    useEffect(() => {
        if(notAuthorized){
            setNotAuthorized(false)
            history.push('/home')
        }
    }, [notAuthorized])
  
    const handleClick = e => {
        e.preventDefault()
        setAddList(true)
    }

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

    if(!activeBoard && isLoaded){
        return (
            <ResourceDoesntExist />
        )
    }

    return isLoaded && finishedDelete && (
        <div id='board-page-wrapper' style={{backgroundColor: `#${activeBoard.backgroundColor}`}}>
            <div id='interior-container'>
                <div id='title-display'>
                    <div id='board-title'>
                        <div id='title-name'>
                            {!changeTitle && (
                                <div onClick={(e => setChangeTitle(true))} id='board-title-title'>
                                    {titleSelected}
                                </div>
                            )}
                            {changeTitle && (
                                <BoardEditTitle titleSelected={titleSelected} board={activeBoard} changeTitle={changeTitle} setChangeTitle={setChangeTitle}/>
                            )}
                        </div>
                        <div style={{marginLeft:'15px'}}>
                            {editBoard && (
                                <div id='board-settings-dropdown-button' onClick={() => setEditBoard(false)}>
                                    <i className="fa-solid fa-chevron-up fa-sm"></i>
                                    <i className="fa-solid fa-gear fa-sm"></i>
                                </div>
                            )}
                            {!editBoard && (
                                <div id='board-settings-dropdown-button' onClick={() => setEditBoard(true)}>
                                    <i className="fa-solid fa-chevron-down fa-sm"></i>
                                    <i className="fa-solid fa-gear fa-sm"></i>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        {editBoard && (
                            <div id='board-settings-dropdown'>
                                <div id='delete-board-button'>
                                    <div onClick={handleBoardDelete}>Delete Board</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div id='list-container'>
                    <div id='lists-map'>
                        {activeBoard.lists.map(list => (
                            <div>
                                <TestList
                                    key={list.id} 
                                    lists={activeBoard.lists}
                                    list={list} 
                                    finishedDelete={finishedDelete} 
                                    setFinishedDelete={setFinishedDelete}
                                />
                            </div>
                        ))}
                    </div>
                    <div id='add-list-button'>
                        {!addList && (
                            <div id='add-list-board-button' onClick={handleClick}>Add New List</div>
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

export default TestBoard