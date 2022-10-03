import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CardModal from "./cardModal";
import { Modal } from '../../../context/Modal'
import CardEditTitle from "./editCardInfo/cardEditTitle";

function BoardCardCard({boardId, card}) {
    const listId = card.listId
    const cardId = card.id
    const [showModal, setShowModal] = useState(false)
    const cardSelected = useSelector(state => ((state.activeWorkspace.workspace.boards.find(board => board.id === boardId)).lists.find(list => list.id === listId)).cards.find(card => card.id === cardId)) 

    const handleClick = e => {
        e.preventDefault()
        setShowModal(true)
    }

    if(!cardSelected) {
        return (
            <div>Loading!</div>
        )
    }

    return cardSelected && (
        <div>
            <div>
                <div onClick={handleClick}>{cardSelected.title}</div>
                {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CardModal card={card}/>
                </Modal>
                )}
            </div>
        </div>
    )
}

export default BoardCardCard