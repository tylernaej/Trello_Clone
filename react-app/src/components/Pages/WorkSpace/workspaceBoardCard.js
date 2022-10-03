import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom"
import './workspaceBoardCard.css'

function WorkspaceBoardCard({workspaceId, board}) {



    return (
        <div>
            <NavLink 
                to={`/w/${workspaceId}/b/${board.id}`}
                style={{textDecoration: 'none'}}
            >
                {board.title}
            </NavLink>
        </div>
    )
}

export default WorkspaceBoardCard