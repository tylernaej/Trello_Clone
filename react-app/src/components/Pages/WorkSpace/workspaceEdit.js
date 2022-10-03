import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import { editWorkspaceThunk } from "../../../store/activeWorkspace";

function WorkspaceEdit({sessionUser, workspace, setEditWorkspace}) {
    const dispatch = useDispatch()
    const [name, setName] = useState(workspace.name)
    const [workspaceType, setWorkspaceType] = useState(workspace.workspaceType)
    const [description, setDescription] = useState(workspace.description)

    const handleSubmit = async e => {
        e.preventDefault()
        
        const workspaceEdit = {
            userId: sessionUser.id,
            name,
            workspaceType,
            description,
            isArchived: 0
        }
        console.log(workspaceEdit)
        const data = await dispatch(editWorkspaceThunk({workspaceId: workspace.id, payload: workspaceEdit}))
        setEditWorkspace(false)
    }

    return (
        <div>
            Workspace Edit
            <div>
                <form onSubmit={handleSubmit} >
                    <div>
                        <label htmlFor="name"></label>
                        <input
                            required
                            type="text"
                            name="name"
                            placeholder={`${name}`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="workspaceType"></label>
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
                    <div >
                        <button type="submit">Update</button>
                    </div>           
                </form>
            </div>
            <div>
                <button className='cancel-button' onClick={(e) => setEditWorkspace(false)}>Cancel</button>
            </div>
        </div>
    )
}

export default WorkspaceEdit