import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addListToBoardThunk } from "../../../store/activeWorkspace";
import { createBoardOnWorkspaceThunk } from "../../../store/workspace";

function BoardCreateList({setAddList, boardId}) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [backgroundColor, setBackgroundColor] = useState("")
    const [visibility, setVisibility] = useState("private")
    const [isArchived, setIsArchived] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
   
    const handleClick = e => {
        e.preventDefault()
        setAddList(false);
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setIsSubmitted(true)

        const newList = {
            boardId,
            title,
            isArchived: 0
        }

        const data = await dispatch(addListToBoardThunk(newList))
        setAddList(false)
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
                        <button type="submit">Add List</button>
                    </div>
                </form>
            </div>
            <div>
                <button className='cancel-button' onClick={handleClick}>Cancel</button>
            </div>
        </div>
    )
}

export default BoardCreateList