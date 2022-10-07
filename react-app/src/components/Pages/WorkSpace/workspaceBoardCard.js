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
                <div 
                    id='board-exterior-container'
                    style={{
                        backgroundColor: `#${board.backgroundColor}`
                    }}
                >
                    <div id='board-interior-container'>
                        <div id='workspace-board-title'>
                            {board.title}
                        </div>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}

export default WorkspaceBoardCard