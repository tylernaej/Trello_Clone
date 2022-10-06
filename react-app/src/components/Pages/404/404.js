import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function NotFound(){
    const history = useHistory()

    useEffect(() =>{
        history.push('/home')
    }, [])

    return 'not found'
}

export default NotFound