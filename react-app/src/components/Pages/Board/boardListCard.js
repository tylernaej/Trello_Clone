import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import BoardCardCard from "./boardCardCard";
import BoardCreateCard from "./boardCreateCard";
import './boardListCard.css'
import ListEditTitle from './listEditTitle'

function BoardListCard({list}) {
    const listId = list.id
    const [addCard, setAddCard] = useState(false)
    const [changeTitle, setChangeTitle] = useState(false)
    const listSelected = useSelector(state => state.activeWorkspace.workspace.boards
                                    .find(board => board.lists.find(list => list.id === listId )).lists
                                    .find(list => list.id === listId))
    const titleSelected = listSelected.title

    const handleClick = e => {
        e.preventDefault()
        setAddCard(true)
    }

    if(!list.cards) {
        return (
            <div>
                <div>
                    {!changeTitle && (
                        <div onClick={(e => setChangeTitle(true))}>
                            {titleSelected}
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
        )
    }

    return list.cards && (
        <div id='list-wrapper'>
            <div>
                {!changeTitle && (
                    <div onClick={(e => setChangeTitle(true))}>
                        {titleSelected}
                    </div>
                )}
                {changeTitle && (
                    <ListEditTitle titleSelected={titleSelected} list={list} changeTitle={changeTitle} setChangeTitle={setChangeTitle}/>
                )}
            </div>
            <div>
                {list.cards.map(card => (
                    <BoardCardCard key={card.id} boardId={list.boardId} card={card}/>
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
    )
}

export default BoardListCard