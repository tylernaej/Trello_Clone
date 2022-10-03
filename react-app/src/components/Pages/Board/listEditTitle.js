import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editListThunk } from "../../../store/activeWorkspace";

function ListEditTitle({titleSelected, list, changeTitle, setChangeTitle}) {
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
                        placeholder={`${title}`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>         
            </form>
        </div>
    )
}

export default ListEditTitle