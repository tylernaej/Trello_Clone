import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBoardsOfWorkspaceThunk } from "../../../store/activeWorkspace";


function ActiveWorkspace() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const activeWorkspace = useSelector(state => state.activeWorkspace.workspace)
    const id = 2

    useEffect(() => {
        dispatch(getAllBoardsOfWorkspaceThunk(id))
        .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <div>
            Here are the boards for the active workspace:
            {activeWorkspace.boards.map((board) => (
                <div>{board.title}</div>
            ))}
        </div>
    )
}

export default ActiveWorkspace