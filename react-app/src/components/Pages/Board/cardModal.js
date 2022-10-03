import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './cardModal.css'
import CardEditDescription from "./editCardInfo/cardEditDescription";
import CardEditTitle from "./editCardInfo/cardEditTitle";
import { deleteCardThunk } from '../../../store/activeWorkspace'

function CardModal({card}) {
    const listId = card.listId
    const cardId = card.id
    const dispatch = useDispatch()
    const [changeTitle, setChangeTitle] = useState(false)
    const [changeDescription, setChangeDescription] = useState(false)
    const cardSelected = useSelector(state => state.activeWorkspace.workspace.boards
                                    .find(board => board.lists.find(list => list.id === listId )).lists
                                    .find(list => list.id === listId)).cards
                                    .find(card => card.id === cardId)
    const titleSelected = cardSelected.title
    const descriptionSelected = cardSelected.description
    const [editCard, setEditCard] = useState(false)

    const handleClickTitle = e => {
        e.stopPropagation()
        setChangeTitle(true)
    }

    const handleClickDescription = e => {
        e.stopPropagation()
        setChangeDescription(true)
    }

    
    const handleDropDownEdit = e => {
        e.preventDefault()
        setEditCard(true)
    }

    const handleCardDelete = async e => {
        e.preventDefault()
        // setFinishedDelete(false)
        const  data = await dispatch(deleteCardThunk(listId, cardId))
        .then(() => setEditCard(false))
        // .then(() => setFinishedDelete(true))
    }

    return (
        <div id="modal-exterior-container">
            <div id='modal-interior-container'>
                <div id='title-header'>
                    {!changeTitle && (
                        <div onClick={handleClickTitle}>
                            {titleSelected}
                        </div>
                    )}
                    {changeTitle && (
                        <CardEditTitle titleSelected={titleSelected} card={card} changeTitle={changeTitle} setChangeTitle={setChangeTitle} />
                    )}
                    <div>
                    <div onClick={handleDropDownEdit}>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                    {editCard && (
                        <div>
                            <div onClick={handleCardDelete}>Delete</div>
                            <div onClick={(e) => setEditCard(false)}>Cancel</div>
                        </div>

                    )}

                    </div>
                </div>
                <div id='main-content'>
                    <div id='main-bar'>
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
            </div>
        </div>
    )
}

export default CardModal