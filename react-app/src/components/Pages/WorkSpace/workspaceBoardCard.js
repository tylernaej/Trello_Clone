import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function WorkspaceBoardCard({board}) {



    return (
        <div>
            {board.title}
        </div>
    )
}

export default WorkspaceBoardCard