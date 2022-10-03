import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './cardModal.css'
import CardEditDescription from "./editCardInfo/cardEditDescription";
import CardEditTitle from "./editCardInfo/cardEditTitle";

function CardModal({card}) {
    const listId = card.listId
    const cardId = card.id
    const [changeTitle, setChangeTitle] = useState(false)
    const [changeDescription, setChangeDescription] = useState(false)
    const cardSelected = useSelector(state => state.activeWorkspace.workspace.boards
                                    .find(board => board.lists.find(list => list.id === listId )).lists
                                    .find(list => list.id === listId)).cards
                                    .find(card => card.id === cardId)
    const titleSelected = cardSelected.title
    const descriptionSelected = cardSelected.description

    const handleClickTitle = e => {
        e.stopPropagation()
        setChangeTitle(true)
    }

    const handleClickDescription = e => {
        e.stopPropagation()
        setChangeDescription(true)
    }

    return (
        <div id="modal-content-wrapper">
                <div>
                    {!changeTitle && (
                        <div onClick={handleClickTitle}>
                            {titleSelected}
                        </div>
                    )}
                    {changeTitle && (
                        <CardEditTitle titleSelected={titleSelected} card={card} changeTitle={changeTitle} setChangeTitle={setChangeTitle} />
                    )}
                </div>
                
            <div id='main-content'>
                <div>
                    {!changeDescription && (
                        <div onClick={handleClickDescription}>
                            {descriptionSelected}
                        </div>
                    )}
                    {changeDescription && (
                        <CardEditDescription descriptionSelected={descriptionSelected} card={card} changeDescription={changeDescription} setChangeDescription={setChangeDescription} />
                    )}
                </div>
                <div>
                    Future Checklists Here
                </div>
                <div>
                    Future Activity Log Here
                </div>
            </div>
            <div id='side-bar'>
                SideBar
            </div>
        </div>
    )
}

export default CardModal