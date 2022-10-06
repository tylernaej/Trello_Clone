import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCardThunk } from '../../../../store/activeWorkspace'

function CardEditDescription({descriptionSelected, card, changeDescription, setChangeDescription, setShowModal}) {
    const dispatch = useDispatch()
    const [description, setDescription] = useState(descriptionSelected)
    const [isSubmitted, setIsSubmitted] = useState(false)
   
    const handleClick = e => {
        e.preventDefault()
        setChangeDescription(false);
    }

    const handleClickOff = e => {
        e.stopPropagation()
    }

    useEffect((e) => {
        const closeMenu = () => {
            if(changeDescription){

                const cardEdit = {
                    listId: card.listId,
                    title: card.title,
                    coverColor: card.coverColor,
                    description,
                    isArchived: 0
                }

                dispatch(editCardThunk({cardId: card.id, payload: cardEdit, previousList: card.listId}))
                .then(() => setChangeDescription(false))
            }
        }
        const clickProtected = document.getElementById('card-description-click-protected')
        const clickProtectedModal = document.getElementById('modal-background')
        document.addEventListener('click', closeMenu, false)
        clickProtected.addEventListener('click', handleClickOff, true)
        return () => document.removeEventListener('click', closeMenu)
    
    }, [changeDescription, description])

    return (
        <div id='card-description-click-protected'>
            <form >
                <div>
                    <label htmlFor="description"></label>
                    <textarea
                        required
                        type="description"
                        name="description"
                        placeholder={`${description}`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>         
            </form>
        </div>
    )
}

export default CardEditDescription