import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBoardsOfWorkspaceThunk } from "../../store/activeWorkspace";


function ActiveWorkspace() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    const id = 2

    useEffect(() => {
        dispatch(getAllBoardsOfWorkspaceThunk(id))
        .then(() => setIsLoaded(true))
    }, [dispatch])

    return isLoaded && (
        <div>
            Specific WorkSpace Here
        </div>
    )
}

export default ActiveWorkspace