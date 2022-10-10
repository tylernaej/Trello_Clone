import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBoardOnActiveWorkspaceThunk } from "../../../store/activeWorkspace";
import './workspaceCreateBoard.css'

function WorkspaceCreateBoard({setShowModal, workspaceId}) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [backgroundColor, setBackgroundColor] = useState("807f7f")
    const [visibility, setVisibility] = useState("private")
    const [isArchived, setIsArchived] = useState("686868")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState([])
    const titleInput = useRef(null)

    useEffect(() => {
        if (titleInput.current) {
          titleInput.current.focus();
        }
    }, []);
    
    useEffect(() => {
        const validationErrors = []
        if(title.length<1) validationErrors.push('Board titles must be between 1 and 99 characters')
        if(title.length >= 100) validationErrors.push('Board titles must be between 1 and 99 characters')
        setErrors(validationErrors)
    }, [title])
   
    const handleClick = e => {
        e.preventDefault()
        setShowModal(false);
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setIsSubmitted(true)

        if(errors.length>0) return

        const newBoard = {
            workspaceId,
            title,
            backgroundColor,
            visibility,
            isArchived: 0
        }

        const data = await dispatch(createBoardOnActiveWorkspaceThunk(newBoard))
        setShowModal(false)
    }

    return (
        <div>
            <div>
                <div id='new-board-title'>
                    <center>
                        First, we need a few details:
                    </center>
                </div>
                <form>
                    <div style={{margin:'10px'}}>
                        <label htmlFor="title">Title</label>
                        <input
                            required
                            ref={titleInput}
                            type="text"
                            name="title"
                            id='title-input'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div style={{margin:'10px'}}>
                        <label htmlFor="backgroundColor">Background Color</label>
                            <select
                                required
                                value={backgroundColor}
                                id='title-input'
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
                    <div style={{margin:'10px'}}>
                        <label htmlFor="visibility">Visibility</label>
                            <select
                                required
                                value={visibility}
                                id='title-input'
                                onChange={(e) => setVisibility(e.target.value)}
                            >
                                <option value="private">Private</option>
                                <option value="workspace">Workspace</option>
                            </select>
                    </div>
                    <div style={{margin:'10px'}}>
                        {errors.map((error, ind) => (
                        <div key={ind} style={{color:'red'}}>{error}</div>
                        ))}
                    </div>
                    <div style={{margin:'10px',display:'flex',flexDirection:'row',justifyContent:'center'}}>
                        <div >
                            <div id='workspace-create-board-button' onClick={handleSubmit}>Create Board</div>
                        </div>
                        <div>
                            <div id='workspace-board-cancel-button' className='cancel-button' onClick={handleClick}>Cancel</div>
                        </div>
                    </div>            
                </form>
            </div>
        </div>
    )
}

export default WorkspaceCreateBoard