import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {createNewWorkspaceThunk} from "../../../store/workspace"
import './homeCreateWorkspace.css'

function HomeCreateWorkspace({setShowModal}) {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [workspaceType, setWorkspaceType] = useState("Other")
    const [isArchived, setIsArchived] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
   
    const handleClick = e => {
        e.preventDefault()
        setShowModal(false);
    }

    const handleSubmit = async e => {
        e.preventDefault()
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
        <div>
            <div>
                <form>
                    <div>
                        <label htmlFor="name">Workspace Name</label>
                        <input
                            required
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="workspaceType">Workspace Type</label>
                            <select
                                required
                                value={workspaceType}
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
                    <div>
                        <label htmlFor="description">Description</label>
                        <input
                            required
                            type="text"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                        <div >
                            <div id='home-create-workspace-button' onClick={handleSubmit}>Create Workspace</div>
                        </div>           
                        <div>
                            <div id='home-workspace-cancel-button' className='cancel-button' onClick={handleClick}>Cancel</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default HomeCreateWorkspace