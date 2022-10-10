import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCardThunk } from '../../../../store/activeWorkspace'
import './cardEditTitle.css'

function CardEditTitle({titleSelected, card, changeTitle, setChangeTitle, setShowModal}) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState(titleSelected)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState([])
   
    const handleClick = e => {
        e.preventDefault()
        setChangeTitle(false);
    }

    const handleClickOff = e => {
        e.stopPropagation()
    }

    useEffect(() => {
        const validationErrors = []
        if(title.length >= 100) validationErrors.push('Card names can\'t exceed more than 100 characters.')
        setErrors(validationErrors)
      }, [title])

    useEffect((e) => {
        const closeMenu = () => {
            if(changeTitle){

                const cardEdit = {
                    listId: card.listId,
                    title,
                    coverColor: card.coverColor,
                    description: card.description,
                    isArchived: 0
                }
       
                if(errors.length>0) return

                dispatch(editCardThunk({cardId: card.id, payload: cardEdit, previousList: card.listId}))
                .then(() => setChangeTitle(false))
                .then(() => setShowModal(false))
            }
        }
        const clickProtected = document.getElementById('card-title-click-protected')
        document.addEventListener('click', closeMenu, false)
        clickProtected.addEventListener('click', handleClickOff, true)
        return () => document.removeEventListener('click', closeMenu)
    
    }, [changeTitle, title, errors])

    return (
        <div id='card-title-click-protected'>
            <form >
                <div>
                    <label htmlFor="title"></label>
                    <input
                        id='card-title-input'
                        required
                        type="text"
                        name="title"
                        placeholder={`${title}`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>         
            </form>
            {errors.length > 0 && (
                <div style={{color:'red'}}>Thats a little too long...</div>
            )}
        </div>
    )
}

export default CardEditTitle