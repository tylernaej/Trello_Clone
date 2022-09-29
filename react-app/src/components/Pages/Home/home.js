import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getCurrentUserWorkspacesThunk} from '../../../store/workspace'
import HomeWorkSpaceCard from "./homeWorkSpaceCard";

function Home() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const workspaces = useSelector(state => state.workspaces)
    const [workSpacesForMap, setWorkSpacesForMap] = useState([])

    useEffect(() => {
        dispatch(getCurrentUserWorkspacesThunk())
        .then(() => setIsLoaded(true))
    }, [dispatch])

    

    useEffect(() =>{
        let workspacesArray = []
        for (const workspace of Object.values(workspaces)){
            workspacesArray.push(workspace)
        }
        setWorkSpacesForMap(workspacesArray)
    }, [workspaces])

    return isLoaded && (
        <div>
            Home Page Here
            <div>
                <div>
                    Side Nav Bar Here
                </div>
                <div>
                    Main Content Here
                    <div>
                        Your Workspaces:
                        <div>
                            {workSpacesForMap.map(workspace => (
                                <HomeWorkSpaceCard key={workspace.id} workspace={workspace}/>       
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
