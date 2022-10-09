import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editListThunk } from "../../../store/activeWorkspace";
import './listEditTitle.css'

function ListEditTitle({titleSelected, list, changeTitle, setChangeTitle}) {
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
        if(title.length >= 100) validationErrors.push('List names can\'t exceed more than 100 characters.')
        setErrors(validationErrors)
      }, [title])

    useEffect((e) => {
        const closeMenu = () => {
            if(changeTitle){

                if(errors.length>0)return

                const listEdit = {
                    boardId: list.boardId,
                    title,
                    isArchived: 0
                }
                
                dispatch(editListThunk({listId: list.id, payload: listEdit}))
                .then(() => setChangeTitle(false))
            }
        }
        const clickProtected = document.getElementById('click-protected')
        document.addEventListener('click', closeMenu, false)
        clickProtected.addEventListener('click', handleClickOff, true)
        return () => document.removeEventListener('click', closeMenu)
    
    }, [changeTitle, title])

    return (
        <div id='click-protected'>
            <form >
                <div>
                    <label htmlFor="title"></label>
                    <input
                        required
                        type="text"
                        name="title"
                        id='title-input'
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

export default ListEditTitle