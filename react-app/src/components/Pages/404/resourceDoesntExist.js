import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import './workspaceDoesntExist.css'
import { useDispatch } from "react-redux";
import { clearWorkspace } from "../../../store/activeWorkspace";

function ResourceDoesntExist(){
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(clearWorkspace())
        setTimeout(() => {
            history.push('/home')
        }, 2500)
    }, [])

    return (
        <div id='oops'>Oops... Looks like this resource doesn't exist yet! Taking you back home...</div>
    )
}

export default ResourceDoesntExist