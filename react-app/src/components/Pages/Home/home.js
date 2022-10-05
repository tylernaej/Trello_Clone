import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getCurrentUserWorkspacesThunk} from '../../../store/workspace'
import HomeWorkSpaceCard from "./homeWorkSpaceCard";
import { Modal } from '../../../context/Modal'
import HomeCreateWorkspace from "./homeCreateWorkspace";
import './home.css'
import { Switch, useRouteMatch, Route, useParams, useLocation } from "react-router-dom";
import Workspace from '../WorkSpace/workspace'
import SideNavBar from "./sideNavBar";

function Home() {
    const { url } = useRouteMatch()
    const location = useLocation()
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const workspaces = useSelector(state => state.workspaces)
    const [workSpacesForMap, setWorkSpacesForMap] = useState([])
    const [workspaceId, setWorkspaceId] = useState("")

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

    useEffect(() => {
        if(location.pathname.split('w/')[1]){
            setWorkspaceId(location.pathname.split('w/')[1])
        }
    }, [dispatch, location])

    return isLoaded && (
        <div id='home-exterior-container'>
            <div id='home-interior-container'>
                <div id='side-nav-bar-container'>
                    <div id='side-nav-bar'>
                        <SideNavBar url={url} workSpacesForMap={workSpacesForMap}/>
                    </div>
                </div>
                <div id='main-content-container'>
                    <Switch >
                        <Route path={`${url}/w/:workspaceId`} >
                            <Workspace workspaceId={workspaceId} />
                        </Route>
                        <Route exact path={`${url}`} >
                            <div>
                                <div className="flex-column">
                                    {workSpacesForMap.map(workspace => (
                                        <HomeWorkSpaceCard
                                            style={{TextDecoraton: 'none'}} 
                                            key={workspace.id}
                                            workspace={workspace}
                                        />       
                                    ))}
                                </div>
                            </div>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default Home
