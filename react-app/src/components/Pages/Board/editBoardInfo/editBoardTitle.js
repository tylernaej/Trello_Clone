import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBoardThunk } from '../../../../store/activeWorkspace'

function BoardEditTitle({titleSelected, board, changeTitle, setChangeTitle}) {
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

                const boardEdit = {
                    workspaceId: board.workspaceId,
                    title,
                    backgroundColor: board.backgroundColor,
                    visibility: board.visibility,
                    isArchived: 0
                }

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
        </div>
    )
}

export default BoardEditTitle