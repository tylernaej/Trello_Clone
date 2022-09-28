import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllWorkspacesThunk} from '../../store/workspace'

function Workspaces() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const workspaces = useSelector(state => state.workspaces)

    useEffect(() => {
        dispatch(getAllWorkspacesThunk())
        .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <div>
            Workspaces Here
        </div>
    )
}

export default Workspaces