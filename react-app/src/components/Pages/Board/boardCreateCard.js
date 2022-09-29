import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCardToListThunk } from "../../../store/activeWorkspace";
import { createBoardOnWorkspaceThunk } from "../../../store/workspace";

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
                <form onSubmit={handleSubmit}>
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
                    <div >
                        <button type="submit">Add Card</button>
                    </div>
                </form>
            </div>
            <div>
                <button className='cancel-button' onClick={handleClick}>Cancel</button>
            </div>
        </div>
    )
}

export default BoardCreateCard