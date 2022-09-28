import React from "react";
import ActiveWorkspace from "../WorkSpace/activeWorkspace";
import Workspaces from "../WorkSpace/workspaces";

function Home() {

    return (
        <div>
            Home Page Here
            <Workspaces />
            <ActiveWorkspace />
        </div>
    )
}

export default Home
