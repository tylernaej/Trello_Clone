import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from 'uuid';
import {deleteBoardThunk, getAllBoardsOfWorkspaceThunk} from '../../../store/activeWorkspace'
import {getAllWorkspacesThunk} from '../../../store/workspace'
import BoardListCard from "../Board/boardListCard";
import { Modal } from '../../../context/Modal'
import BoardCreateList from "../Board/boardCreateList";
import BoardEditTitle from "../Board/editBoardInfo/editBoardTitle";
import './testBoard.css'
import ResourceDoesntExist from "../404/resourceDoesntExist";


const cardsFromBackend = [
    {id: uuidv4(), content: 'First Task'},
    {id: uuidv4(), content: 'Second Task'}
]

const listsFromBackend = 
    {
        [uuidv4()]: {
            name:'Todo',
            cards: cardsFromBackend
        },
        [uuidv4()]: {
            name: 'In Progress',
            cards: []
        }
    }
;

const onDragEnd = (result, lists, setLists) => {
    if(!result.destination) return;
    const {source, destination} = result
    if (source.droppableId !== destination.droppableId) {
        const sourceList = lists[source.droppableId];
        const destList = lists[destination.droppableId];
        const sourceCards = [...sourceList.cards];
        const destCards = [...destList.cards];
        const [removed] = sourceCards.splice(source.index, 1);
        destCards.splice(destination.index, 0, removed);
        setLists({
            ...lists, 
            [source.droppableId]: {
                ...sourceList,
                cards: sourceCards
            },
            [destination.droppableId]: {
                ...destList,
                cards: destCards
            }
        })
    } else {
        const list = lists[source.droppableId];
        const copiedCards = [...list.cards]
        const [removed] = copiedCards.splice(source.index, 1)
        copiedCards.splice(destination.index, 0, removed)
        setLists({
            ...lists,
            [source.droppableId]: {
                ...list,
                cards:copiedCards
            }
        })
    }
}

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
    const [lists, setLists] = useState(listsFromBackend)
 
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

    //console.logs

    return(
        <div>
            <div style={{display: 'flex', justifyContent: 'center', height: '100%' }}>
                <DragDropContext>
                    {activeBoard?.lists.map(list => (
                        <div>
                            <Droppable droppableId={list.id}>
                                {(provided, snapshot) => (
                                    <BoardListCard 
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        key={list.id} 
                                        lists={activeBoard.lists}
                                        list={list} 
                                        finishedDelete={finishedDelete} 
                                        setFinishedDelete={setFinishedDelete}
                                        style={{
                                            background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                            padding: 4,
                                            width: 250, 
                                            minHeight: 500,
                                            margin: 5
                                        }}
                                    />
                                )}

                            </Droppable>
                        </div>
                    ))}
                </DragDropContext>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', height: '100%' }}>
                <DragDropContext onDragEnd={result => onDragEnd(result, lists, setLists)}>
                    {Object.entries(lists).map(([id, list]) => {
                        return (
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '8px'}}>
                                <h2>{list.name}</h2>
                                <Droppable droppableId={id}>
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                                    padding: 4,
                                                    width: 250, 
                                                    minHeight: 500
                                                }}
                                            >
                                                {list.cards.map((item, index) => {
                                                    return (
                                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            userSelect: 'none',
                                                                            padding: 16,
                                                                            margin: '0 0 8px 0',
                                                                            minHeight: '50px',
                                                                            backgroundColor: snapshot.isDragging ? '#263b4a' : '#456c86',
                                                                            color: 'white',
                                                                            ...provided.draggableProps.style
                                                                        }}
                                                                    >
                                                                        {item.content}
                                                                    </div>
                                                                )
                                                            }}
                                                        </Draggable>
                                                    )
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }}
                                </Droppable>
                            </div>
                        )
                    })}
                </DragDropContext>
            </div>
        </div>
    )
}

export default TestBoard