import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function HomeBoardCard({board, workspaceId}) {

    return (
        <div>
            <div>
                <NavLink to={`w/${workspaceId}/b/${board.id}`}>
                    {board.title}
                </NavLink>
            </div>
        </div>
    )
}

export default HomeBoardCard