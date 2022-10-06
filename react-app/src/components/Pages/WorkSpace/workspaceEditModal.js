import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './workspaceEditModal.css'
import {editWorkspaceThunk} from '../../../store/activeWorkspace'

function WorkspaceEditModal({sessionUser, workspace, setEditWorkspace}) {
    const dispatch = useDispatch()
    const [name, setName] = useState(workspace.name)
    const [workspaceType, setWorkspaceType] = useState(workspace.workspaceType)
    const [description, setDescription] = useState(workspace.description)
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        const validationErrors = []
        if(description.length > 500) validationErrors.push('Description can\'t exceed 500 characters')
        if(name.length > 100) validationErrors.push('Name can\'t exceed 100 characters')
        setErrors(validationErrors)
      }, [description, name])

    const handleSubmit = async e => {
        e.preventDefault()

        if(errors.length>0) return
        
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
        <div id='workspace-modal-container'>
            <div>
                <form >
                    <div>
                        <label htmlFor="name"></label>
                        <input
                            required
                            type="text"
                            id='name-edit-field'
                            name="name"
                            placeholder={`${name}`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div id='description-container'>
                        <div style={{margin:'5px'}}>
                            <label id='description-label' htmlFor="description" style={{margin:'5px'}}>Description</label>
                            <textarea
                                required
                                type="text"
                                id='description-box'
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <div style={{margin:'5px', fontSize:'small'}}>{`${(500 - description.length) !== 500? `${(500 - description.length)} characters remaining` : 'A description is required'}`}</div>
                        </div>
                    </div>
                    <div style={{marginTop:'15px'}}>
                        <label id='workspace-label' htmlFor="workspaceType">Workspace Type</label>
                            <select
                                required
                                id='workspace-type-select'
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
                        {errors.map((error, ind) => (
                        <div key={ind} style={{color:'red'}}>{error}</div>
                        ))}
                    </div>
                    <div id='button-container' style={{marginTop:'15px'}}>
                        <div id='ws-edit-submit-button' onClick={handleSubmit} >Update</div>
                        <div id='ws-edit-cancel-button' className='cancel-button' onClick={(e) => setEditWorkspace(false)}>Cancel</div>
                    </div> 
                </form>
            </div>
        </div>
    )
}

export default WorkspaceEditModal