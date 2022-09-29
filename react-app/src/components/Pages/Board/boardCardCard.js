import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function BoardCardCard({card}) {

    return (
        <div>
            <div>
                {card.title}
            </div>
        </div>
    )
}

export default BoardCardCard