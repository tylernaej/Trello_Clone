import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function HomeBoardCard({board}) {

    return (
        <div>
            <div>
                {board.title}
            </div>
        </div>
    )
}

export default HomeBoardCard