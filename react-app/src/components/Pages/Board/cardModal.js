import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './cardModal.css'
import CardEditDescription from "./editCardInfo/cardEditDescription";
import CardEditTitle from "./editCardInfo/cardEditTitle";
import { deleteCardThunk, editCardThunk } from '../../../store/activeWorkspace'

function CardModal({lists, card, setShowModal, setFinishedDelete}) {
    const listId = card.listId
    const cardId = card.id
    const dispatch = useDispatch()
    const [changeTitle, setChangeTitle] = useState(false)
    const [changeDescription, setChangeDescription] = useState(false)
    const cardSelected = useSelector(state => state.activeWorkspace.workspace.boards
                                    .find(board => board.lists.find(list => list?.id === listId )).lists
                                    .find(list => list?.id === listId)).cards
                                    .find(card => card?.id === cardId)
    const titleSelected = cardSelected.title
    const descriptionSelected = cardSelected.description
    const [moveCard, setMoveCard] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [listDestination, setListDestination] = useState(card.listId)

    const handleClickTitle = e => {
        e.stopPropagation()
        setChangeTitle(true)
    }

    const handleClickDescription = e => {
        e.stopPropagation()
        setChangeDescription(true)
    }

    const handleCardMove = async e => {
        e.preventDefault()

        const cardEdit = {
            listId: listDestination,
            title: card.title,
            coverColor: card.coverColor,
            description: card.description,
            isArchived: 0
        }

        dispatch(editCardThunk({cardId: card.id, payload: cardEdit, previousList: card.listId}))
        .then(() => setShowModal(false))
    }

    const handleCardDelete = async e => {
        e.preventDefault()
        setFinishedDelete(false)
        const  data = await dispatch(deleteCardThunk(listId, cardId))
        .then(() => setFinishedDelete(true))
        .then(() => setShowModal(false))
    }

    const listOptions = lists.map(list => {
        return (
            <option key={list.id} value={list.id}>{list.title}</option>
        )
    })

    return (
        <div id="modal-exterior-container">
            <div id='modal-interior-container'>
                <div id='title-header'>
                    {!changeTitle && (
                        <div onClick={handleClickTitle} id='card-modal-title-title'>
                            {titleSelected}
                        </div>
                    )}
                    {changeTitle && (
                        <CardEditTitle 
                            titleSelected={titleSelected} 
                            card={card} 
                            changeTitle={changeTitle} 
                            setChangeTitle={setChangeTitle}
                            setShowModal={setShowModal} 
                        />
                    )}
                </div>
                <div id='main-content'>
                    <div id='main-bar'>
                        {!moveCard && !confirmDelete && (
                            <div>
                                <div>
                                    {!changeDescription && (
                                        <div id='description-field' onClick={handleClickDescription}>
                                            {descriptionSelected}
                                        </div>
                                    )}
                                    {changeDescription && (
                                        <CardEditDescription descriptionSelected={descriptionSelected} card={card} changeDescription={changeDescription} setChangeDescription={setChangeDescription} />
                                    )}
                                </div>
                                {/* <div>
                                    Future Checklists Here
                                </div>
                                <div>
                                    Future Activity Log Here
                                </div> */}
                            </div>
                        )}
                        {moveCard && (
                            <div>
                                <div id='card-modal-title-title'>
                                    Moving Card: {card.title}
                                </div>
                                <div>
                                    Where to?
                                </div>
                                <form>
                                    <select
                                        value={listDestination}
                                        onChange={(e) => setListDestination(e.target.value)}
                                    >
                                        {listOptions}
                                    </select>
                                </form>
                                <div id='card-update-buttons'>
                                    <div id='move-card-button' onClick={handleCardMove}>Move Card</div>
                                    <div id='cancel-card-button' onClick={() => setMoveCard(false)}>Cancel</div>
                                </div>
                            </div>
                        )}
                        {confirmDelete && (
                            <div>
                                <div id='are-you-sure-you-want-to'>
                                    Are you sure you want to delete {card.title}?
                                </div>
                                <div id='card-update-buttons'>
                                    <div id='delete-card-button' onClick={handleCardDelete}>Delete</div>
                                    <div id='cancel-card-button' onClick={()=>setConfirmDelete(false)}>Cancel</div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div id='side-bar'>
                        <div id='card-modifiers'>
                            <div 
                                id={changeTitle?'confirm-updates-button':'edit-title-button'} 
                                onClick={changeTitle? null :handleClickTitle}
                            >
                                {changeTitle?'Confirm Update':'Edit Title'}
                            </div>
                            <div 
                                id={changeDescription?'confirm-updates-button':'edit-description-button'} 
                                onClick={changeDescription?null:handleClickDescription}
                            > 
                                {changeDescription?'Confirm Update':'Edit Description'}
                            </div>
                            <div id='move-card-button' onClick={() => setMoveCard(true)}>
                                Move Card
                            </div>
                            <div id='delete-card-button' onClick={() => setConfirmDelete(true)}>
                                Delete
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardModal