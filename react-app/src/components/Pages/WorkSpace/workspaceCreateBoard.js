import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBoardOnActiveWorkspaceThunk } from "../../../store/activeWorkspace";

function WorkspaceCreateBoard({setShowModal, workspaceId}) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [backgroundColor, setBackgroundColor] = useState("")
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

        const data = await dispatch(createBoardOnActiveWorkspaceThunk(newBoard))
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
                        <input
                            required
                            type="text"
                            name="backgroundColor"
                            value={backgroundColor}
                            onChange={(e) => setBackgroundColor(e.target.value)}
                        />
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

export default WorkspaceCreateBoard