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
                                <option value='807f7f'>Granite</option>
                                <option value='95716a'>Opium</option>
                                <option value='79956a'>Highland</option>
                                <option value='827d52'>Shadow</option>
                                <option value='6a8e95'>Juniper</option>
                                <option value='525782'>Dusk</option>
                                <option value='82526f'>Lavender</option>
                                <option value='528265'>Mint</option>
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