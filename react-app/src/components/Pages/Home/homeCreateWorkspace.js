import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createNewWorkspaceThunk} from "../../../store/workspace"
import './homeCreateWorkspace.css'

function HomeCreateWorkspace({setShowModal, welcomeMessage}) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [workspaceType, setWorkspaceType] = useState("Other")
    const [isArchived, setIsArchived] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState([])
  
    useEffect(() => {
        const validationErrors = []
        if(name.length === 0) validationErrors.push('Don\'t forget to name your workspace!')
        if(description.length === 0) validationErrors.push('A brief description is required')
        if(name.length > 100) validationErrors.push('Workspace names can\'t exceed more than 100 characters.')
        if(description.length > 500) validationErrors.push('Descriptions can\'t exceed more than 500 characters.')

        setErrors(validationErrors)
    }, [name, description])
   
    const handleClick = e => {
        e.preventDefault()
        setShowModal(false);
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if(errors.length>0) return

        setIsSubmitted(true)


        const newWorkspace = {
            userId: sessionUser.id,
            name,
            workspaceType,
            description,
            isArchived: 0
        }

        const data = await dispatch(createNewWorkspaceThunk(newWorkspace))
        setShowModal(false)
    }

    return (
        <div id='create-workspace-modal'>
            <div id=''>
                {welcomeMessage && (
                    <div id='welcome-message-container'>
                        <div id='welcome-header'>
                            Welcome to Stratify!
                        </div>
                        <div id='welcome-paragraph'>
                            <center>
                                This platform is all about organizing your team's workload. Break down large goals into small, obtainable to-do list items. Stay on track and never miss a beat. To get started, let's create a place for you or your team to get some work done.
                            </center>
                        </div>
                        <div id='lets-get-started'>
                            Let's get started by creating your first workspace below: 
                        </div>
                    </div>
                )}
                {!welcomeMessage && (
                    <div id='new-board-title'>
                        <center>
                            First, we need a few details:
                        </center>
                    </div>
                )}
                <form>
                    <div id='form-input'>
                        <label htmlFor="name">Workspace Name</label>
                        <input
                            required
                            type="text"
                            name="name"
                            id='title-input'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div id='form-input'>
                        <label htmlFor="workspaceType">Workspace Type</label>
                            <select
                                required
                                value={workspaceType}
                                id='title-input'
                                onChange={(e) => setWorkspaceType(e.target.value)}
                            >
                                <option value="Education">Education</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Small Business">Small Business</option>
                                <option value="Operations">Operations</option>
                                <option value="Sales CRM">Sales CRM</option>
                                <option value="Engineering IT">Engineering IT</option>
                                <option value="Human Resources">Human Resources</option>
                                <option value="Other">Other</option>
                            </select>
                    </div>
                    <div id='form-input'>
                        <label htmlFor="description">Description</label>
                        <textarea
                            required
                            type="text"
                            id='description-textarea'
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div id='errors-div'>
                        {errors.map((error, ind) => (
                        <div  key={ind} style={{color:'red'}}>{error}</div>
                        ))}
                    </div>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                        <div >
                            <div id='home-create-workspace-button' onClick={handleSubmit}>Create Workspace</div>
                        </div>           
                        <div>
                            <center>
                                <div id='home-workspace-cancel-button' className='cancel-button' onClick={handleClick}>Cancel</div>
                            </center>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default HomeCreateWorkspace