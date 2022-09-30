import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import BoardCardCard from "./boardCardCard";
import BoardCreateCard from "./boardCreateCard";

function BoardListCard({list}) {
    const [addCard, setAddCard] = useState(false)


    const handleClick = e => {
        e.preventDefault()
        setAddCard(true)
    }

    if(!list.cards) {
        return (
            <div>
                <div>
                    {list.title}
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
        <div>
            <div>
                {list.title}
            </div>
            <div>
                {list.cards.map(card => (
                    <BoardCardCard key={card.id} card={card}/>
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