import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import BoardCardCard from "./boardCardCard";
import BoardCreateCard from "./boardCreateCard";
import './boardListCard.css';
import ListEditTitle from './listEditTitle';
import { deleteListThunk } from '../../../store/activeWorkspace'

function BoardListCard({lists, list, finishedDelete, setFinishedDelete}) {
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
                                            {titleSelected}
                                            {isHovering && (
                                                <i className="fa-solid fa-pen fa-sm"></i>
                                            )}
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
                                        <div>
                                            <div onClick={handleListDelete}>Delete</div>
                                            <div onClick={(e) => setEditList(false)}>Cancel</div>
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
                            <button onClick={handleClick}>Add a card</button>
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
                                            {titleSelected}
                                            {isHovering && (
                                                <i className="fa-solid fa-pen fa-sm"></i>
                                            )}
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
                                        <div>
                                            <div onClick={handleListDelete}>Delete</div>
                                            <div onClick={(e) => setEditList(false)}>Cancel</div>
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
                    {list.cards.map(card => (
                        <BoardCardCard 
                            key={card.id} 
                            lists={lists} 
                            boardId={list.boardId} 
                            card={card} 
                        />
                    ))}
                </div>
                <div>
                    {!addCard && (
                        <button onClick={handleClick}>Add a card</button>
                    )}
                    {addCard && (
                        <BoardCreateCard setAddCard={setAddCard} listId={list.id}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BoardListCard