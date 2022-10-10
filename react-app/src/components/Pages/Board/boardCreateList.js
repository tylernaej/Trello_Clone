import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addListToBoardThunk } from "../../../store/activeWorkspace";
import { createBoardOnWorkspaceThunk } from "../../../store/workspace";
import './boardCreateList.css'

function BoardCreateList({setAddList, boardId}) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    // const [backgroundColor, setBackgroundColor] = useState("")
    // const [visibility, setVisibility] = useState("private")
    // const [isArchived, setIsArchived] = useState("")
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
        if(title.length >= 100) validationErrors.push('List names can\'t exceed more than 100 characters.')
        setErrors(validationErrors)
      }, [title])
   
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
        <div id='board-create-list-exterior-container'>
            <div>
                <form>
                    <div>
                        <label htmlFor="title" >List title</label>
                        <input
                            required
                            ref={titleInput}
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    {errors.length > 0 && (
                        <div style={{color:'white'}}>Thats a little too long...</div>
                    )}
                    <div id='card-modifiers' style={{display:'flex', flexDirection:'row'}}>
                        <div >
                            <div type="submit" id='list-submit-button' onClick={handleSubmit}><center>Add List</center></div>
                        </div>
                        <div>
                            <div id='list-cancel-button' className='cancel-button' onClick={handleClick}><center>Cancel</center></div>
                        </div>
                    </div>         
                </form>
            </div>
        </div>
    )
}

export default BoardCreateList