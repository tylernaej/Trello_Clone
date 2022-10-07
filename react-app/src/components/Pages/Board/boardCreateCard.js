import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCardToListThunk } from "../../../store/activeWorkspace";
import { createBoardOnWorkspaceThunk } from "../../../store/workspace";
import './boardCreateCard.css'


function BoardCreateCard({setAddCard, listId}) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
   
    const handleClick = e => {
        e.preventDefault()
        setAddCard(false);
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setIsSubmitted(true)

        const newCard = {
            listId,
            title,
            coverColor: "grey",
            description: "Add a description..",
            isArchived: 0
        }

        const data = await dispatch(addCardToListThunk(newCard))
        setAddCard(false)
    }

    return (
        <div>
            <div>
                <form >
                    <div>
                        <label htmlFor="title">Title</label>
                        <input
                            required
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                        <div>
                            <div onClick={handleSubmit} id='card-submit-button'>Add Card</div>
                        </div>
                        <div>
                            <div className='cancel-button' onClick={handleClick} id='card-cancel-button'>Cancel</div>
                        </div>
                    </div>         
                </form>
            </div>
        </div>
    )
}

export default BoardCreateCard