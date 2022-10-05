import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCardThunk } from '../../../../store/activeWorkspace'

function CardEditTitle({titleSelected, card, changeTitle, setChangeTitle}) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState(titleSelected)
    const [isSubmitted, setIsSubmitted] = useState(false)
   
    const handleClick = e => {
        e.preventDefault()
        setChangeTitle(false);
    }

    const handleClickOff = e => {
        e.stopPropagation()
    }

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

                dispatch(editCardThunk({cardId: card.id, payload: cardEdit}))
                .then(() => setChangeTitle(false))
            }
        }
        const clickProtected = document.getElementById('card-title-click-protected')
        document.addEventListener('click', closeMenu, false)
        clickProtected.addEventListener('click', handleClickOff, true)
        return () => document.removeEventListener('click', closeMenu)
    
    }, [changeTitle, title])

    return (
        <div id='card-title-click-protected'>
            <form >
                <div>
                    <label htmlFor="title"></label>
                    <input
                        required
                        type="text"
                        name="title"
                        placeholder={`${title}`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>         
            </form>
        </div>
    )
}

export default CardEditTitle