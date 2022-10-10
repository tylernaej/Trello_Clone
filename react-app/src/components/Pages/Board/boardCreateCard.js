import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCardToListThunk } from "../../../store/activeWorkspace";
import { createBoardOnWorkspaceThunk } from "../../../store/workspace";
import './boardCreateCard.css'


function BoardCreateCard({setAddCard, listId}) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const validationErrors = []
        if(title.length >= 100) validationErrors.push('Card names must be less than 100 characters')
        // if(title.length < 1) validationErrors.push('Board names must be more than 1 character')
        setErrors(validationErrors)
      }, [title])
   
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
                    {errors.map((error, ind) => (
                        <div id='board-errors-map' key={ind} style={{color:'red'}}>{error}</div>
                    ))}
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                        <div>
                            <div onClick={handleSubmit} id='card-submit-button'><center>Add Card</center></div>
                        </div>
                        <div>
                            <div className='cancel-button' onClick={handleClick} id='card-cancel-button'><center>Cancel</center></div>
                        </div>
                    </div>         
                </form>
            </div>
        </div>
    )
}

export default BoardCreateCard