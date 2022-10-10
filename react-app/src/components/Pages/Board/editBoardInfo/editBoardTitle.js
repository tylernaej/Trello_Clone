import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBoardThunk } from '../../../../store/activeWorkspace'
import './editBoardTitle.css'

function BoardEditTitle({titleSelected, board, changeTitle, setChangeTitle}) {
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
        if(title.length >= 100) validationErrors.push('Board names must be less than 100 characters')
        // if(title.length < 1) validationErrors.push('Board names must be more than 1 character')
        setErrors(validationErrors)
      }, [title])

    useEffect((e) => {
        const closeMenu = () => {
            if(changeTitle){

                const boardEdit = {
                    workspaceId: board.workspaceId,
                    title,
                    backgroundColor: board.backgroundColor,
                    visibility: board.visibility,
                    isArchived: 0
                }

                if(errors.length>0) return

                dispatch(editBoardThunk({boardId: board.id, payload: boardEdit}))
                .then(() => setChangeTitle(false))
            }
        }
        const clickProtected = document.getElementById('board-title-click-protected')
        document.addEventListener('click', closeMenu, false)
        clickProtected.addEventListener('click', handleClickOff, true)
        return () => document.removeEventListener('click', closeMenu)
    
    }, [changeTitle, title, errors])

    return (
        <div id='board-title-click-protected'>
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
            {errors.map((error, ind) => (
                <div id='board-errors-map' key={ind} style={{color:'red'}}>{error}</div>
            ))}
        </div>
    )
}

export default BoardEditTitle