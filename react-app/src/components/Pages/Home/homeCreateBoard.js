import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBoardOnWorkspaceThunk } from "../../../store/workspace";

function HomeCreateBoard({setShowModal, workspaceId}) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [backgroundColor, setBackgroundColor] = useState("686868")
    const [visibility, setVisibility] = useState("private")
    const [isArchived, setIsArchived] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
   
    const handleClick = e => {
        e.preventDefault()
        setShowModal(false);
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setIsSubmitted(true)

        const newBoard = {
            workspaceId,
            title,
            backgroundColor,
            visibility,
            isArchived: 0
        }

        console.log('payload is',newBoard)

        const data = await dispatch(createBoardOnWorkspaceThunk(newBoard))
        setShowModal(false)
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
                    <div>
                        <label htmlFor="backgroundColor">Background Color</label>
                            <select
                                required
                                value={backgroundColor}
                                onChange={(e) => setBackgroundColor(e.target.value)} 
                            >
                                <option value='686868'>Grey</option>
                                <option value='822020'>Red</option>
                                <option value='a95a00'>Orange</option>
                                <option value='9a8000'>Yellow</option>
                                <option value='387c79'>Light Blue</option>
                                <option value='0f3c6f'>Blue</option>
                                <option value='3b2568'>Purple</option>
                                <option value='853e88'>Pink</option>
                                <option value='2d5b28'>Green</option>
                            </select>
                    </div>
                    <div>
                        <label htmlFor="visibility">Visibility</label>
                            <select
                                required
                                value={visibility}
                                onChange={(e) => setVisibility(e.target.value)}
                            >
                                <option value="private">Private</option>
                                <option value="workspace">Workspace</option>
                            </select>
                    </div>            
                    <div >
                        <button type="submit">Create Board</button>
                    </div>
                </form>
            </div>
            <div>
                <button className='cancel-button' onClick={handleClick}>Cancel</button>
            </div>
        </div>
    )
}

export default HomeCreateBoard