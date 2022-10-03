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
                            <select
                                required
                                value={backgroundColor}
                                onChange={(e) => setBackgroundColor(e.target.value)} 
                            >
                                <option value='b4b4b4'>Grey</option>
                                <option value='d84f4f'>Red</option>
                                <option value='d8884f'>Orange</option>
                                <option value='d8bf4f'>Yellow</option>
                                <option value='4fd8c3'>Aqua</option>
                                <option value='4fa8d8'>Blue</option>
                                <option value='9a4fd8'>Purple</option>
                                <option value='d84fa8'>Pink</option>
                                <option value='49a55a'>Green</option>
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

export default WorkspaceCreateBoard