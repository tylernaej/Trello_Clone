import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import BoardCardCard from "../Board/boardCardCard";
import BoardCreateCard from "../Board/boardCreateCard";
import '../Board/boardListCard.css';
import ListEditTitle from '../Board/listEditTitle';
import { v4 as uuidv4 } from 'uuid';
import { deleteListThunk } from '../../../store/activeWorkspace'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TestCard from "./testCards";

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

const onDragEnd = (result, lists2, setLists2) => {
    if(!result.destination) return;
    const {source, destination} = result
    if (source.droppableId !== destination.droppableId) {
        const sourceList = lists2[source.droppableId];
        const destList = lists2[destination.droppableId];
        const sourceCards = [...sourceList.cards];
        const destCards = [...destList.cards];
        const [removed] = sourceCards.splice(source.index, 1);
        destCards.splice(destination.index, 0, removed);
        setLists2({
            ...lists2, 
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
        const list2 = lists2[source.droppableId];
        const copiedCards = [...list2.cards]
        const [removed] = copiedCards.splice(source.index, 1)
        copiedCards.splice(destination.index, 0, removed)
        setLists2({
            ...lists2,
            [source.droppableId]: {
                ...list2,
                cards:copiedCards
            }
        })
    }
}

function TestList({lists, list, finishedDelete, setFinishedDelete}) {
    const listId = list.id
    const dispatch = useDispatch()
    const [addCard, setAddCard] = useState(false)
    const [changeTitle, setChangeTitle] = useState(false)
    const listSelected = useSelector(state => state.activeWorkspace.workspace.boards
                                    .find(board => board.lists.find(list => list?.id === listId )).lists
                                    .find(list => list?.id === listId))
    const cards = useSelector(state => state.activeWorkspace.workspace.boards
                                    .find(board => board.lists.find(list => list?.id === listId )).lists
                                    .find(list => list?.id === listId).cards)
    const titleSelected = listSelected.title
    const [editList, setEditList] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [lists2, setLists2] = useState(listsFromBackend)
  
    const handleClick = e => {
        e.preventDefault()
        setAddCard(true)
    }

    const handleListDelete = async e => {
        e.preventDefault()
        setFinishedDelete(false)
        const listId = Number(listSelected.id)
        const  data = await dispatch(deleteListThunk(listId))
        .then(() => setEditList(false))
        .then(() => setFinishedDelete(true))
    }

    const handleEnter = () => {
        setIsHovering(true)
    }

    const handleLeave = () => {
        setIsHovering(false)
    }

    if(!list.cards) {
        return (
            <div id='list-exterior-container'>
                <div id='list-interior-container'>
                    <div id='title-container'>
                        {!changeTitle && (
                            <div id='title-plus-dropdown-container'>
                                <div id='non-edit-title'>
                                    <div 
                                        onClick={(e => setChangeTitle(true))}
                                        id='title-text-container'
                                        onMouseEnter={handleEnter}
                                        onMouseLeave={handleLeave}
                                    >
                                        <div id='title-text'>
                                            <div id='list-title-title'>
                                                {titleSelected}
                                            </div>
                                            <div>
                                                {isHovering && (
                                                    <i className="fa-solid fa-pen fa-sm"></i>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {editList && (
                                        <div id='settings-dropdown-button' onClick={() => setEditList(false)}>
                                            <i className="fa-solid fa-chevron-up fa-sm"></i>
                                            <i className="fa-solid fa-gear fa-sm"></i>
                                        </div>
                                    )}
                                    {!editList && (
                                        <div id='settings-dropdown-button' onClick={() => setEditList(true)}>
                                            <i className="fa-solid fa-chevron-down fa-sm"></i>
                                            <i className="fa-solid fa-gear fa-sm"></i>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {editList && (
                                        <div id='list-settings-dropdown'>
                                            <div id='list-delete-list-button' onClick={handleListDelete}><center>Delete</center></div>
                                            <div id='list-cancel-list-button' onClick={(e) => setEditList(false)}><center>Cancel</center></div>
                                        </div>
    
                                    )}
                                </div>
                            </div>
                        )}
                        {changeTitle && (
                            <ListEditTitle titleSelected={titleSelected} list={list} changeTitle={changeTitle} setChangeTitle={setChangeTitle}/>
                        )}
                    </div>
                    <div>
                        {!addCard && (
                            <div id='board-add-card-button' onClick={handleClick}>Add a card</div>
                        )}
                        {addCard && (
                            <BoardCreateCard setAddCard={setAddCard} listId={list.id}/>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return list.cards && (
        <div id='list-exterior-container'>
            <div id='list-interior-container'>
                <div id='title-container'>
                    {!changeTitle && (
                            <div id='title-plus-dropdown-container'>
                                <div id='non-edit-title'>
                                    <div 
                                        onClick={(e => setChangeTitle(true))}
                                        id='title-text-container'
                                        onMouseEnter={handleEnter}
                                        onMouseLeave={handleLeave}
                                    >
                                        <div id='title-text'>
                                            <div id='list-title-title'>
                                                {titleSelected}
                                            </div>
                                            <div>
                                                {isHovering && (
                                                    <i className="fa-solid fa-pen fa-sm"></i>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {editList && (
                                        <div id='settings-dropdown-button' onClick={() => setEditList(false)}>
                                            <i className="fa-solid fa-chevron-up fa-sm"></i>
                                            <i className="fa-solid fa-gear fa-sm"></i>
                                        </div>
                                    )}
                                    {!editList && (
                                        <div id='settings-dropdown-button' onClick={() => setEditList(true)}>
                                            <i className="fa-solid fa-chevron-down fa-sm"></i>
                                            <i className="fa-solid fa-gear fa-sm"></i>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {editList && (
                                        <div id='list-settings-dropdown'>
                                            <div id='list-delete-list-button' onClick={handleListDelete}><center>Delete</center></div>
                                            <div id='list-cancel-list-button' onClick={(e) => setEditList(false)}><center>Cancel</center></div>
                                        </div>
    
                                    )}
                                </div>
                            </div>
                        )}
                        {changeTitle && (
                            <ListEditTitle titleSelected={titleSelected} list={list} changeTitle={changeTitle} setChangeTitle={setChangeTitle}/>
                        )}
                </div>
                <div>
                    <DragDropContext onDragEnd={result => console.log(result)}>
                        <Droppable droppableId={list.id}>
                            {(provided, snapshot) => {
                                return (
                                    <div {...provided.droppableProps} ref={provided.innerRef}>
                                        {list.cards.map((card, index) => {
                                            return (
                                                <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
                                                    {(provided, snapshot) => {
                                                        return (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                // style={{
                                                                //     userSelect: 'none',
                                                                //     padding: 16,
                                                                //     margin: '0 0 8px 0',
                                                                //     minHeight: '50px',
                                                                //     backgroundColor: snapshot.isDragging ? '#263b4a' : '#456c86',
                                                                //     color: 'white',
                                                                //     ...provided.draggableProps.style
                                                                // }}
                                                            >
                                                                {/* {card.title} */}
                                                                <TestCard 
                                                                    key={card.id} 
                                                                    lists={lists} 
                                                                    boardId={list.boardId} 
                                                                    card={card} 
                                                                />
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
                    </DragDropContext>
                </div>
                <div>
                    {!addCard && (
                        <div id='board-add-card-button' onClick={handleClick}>Add a card</div>
                    )}
                    {addCard && (
                        <BoardCreateCard setAddCard={setAddCard} listId={list.id}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TestList