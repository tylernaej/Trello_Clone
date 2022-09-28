import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllWorkspacesThunk} from '../../../store/workspace'

function Home() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const workspaces = useSelector(state => state.workspaces)

    useEffect(() => {
        dispatch(getAllWorkspacesThunk())
        .then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        <div>
            Home Page Here
        </div>
    )
}

export default Home
