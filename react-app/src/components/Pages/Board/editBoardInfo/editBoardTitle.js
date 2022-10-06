import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBoardThunk } from '../../../../store/activeWorkspace'

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
        if(title.length > 100) validationErrors.push('Thats a little too long...')
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
    
    }, [changeTitle, title])

    return (
        <div id='board-title-click-protected'>
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
            {errors.length > 0 && (
                <div style={{color:'red'}}>Thats a little too long...</div>
            )}
        </div>
    )
}

export default BoardEditTitle