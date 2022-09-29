import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBoardsOfWorkspaceThunk } from "../../../store/activeWorkspace";
import { useParams } from "react-router-dom";

function Workspace() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const workspaces = useSelector(state => state.workspaces)
    const workspace = useSelector(state => state.activeWorkspace.workspace)
    const idFromParams = useParams()
    const id = idFromParams.workspaceId

    useEffect(() => {
        dispatch(getAllBoardsOfWorkspaceThunk(id))
        .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <div>
            Single Workspace Page Here
            <div>{workspace.name}</div>
            <div>
                Boards Here
            </div>
        </div>
    )
}

export default Workspace