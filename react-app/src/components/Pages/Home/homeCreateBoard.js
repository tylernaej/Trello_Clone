import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function HomeCreateBoard({setShowModal}) {
    const [title, setTitle] = useState("")
    const [backgroundColor, setBackgroundColor] = useState("")
    const [visibility, setVisibility] = useState("")
    const [isArchived, setIsArchived] = useState("")

    const handleClick = e => {
        e.preventDefault()
        setShowModal(false);
    }

    return (
        <div>
            <div>
            <form >
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        required
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="backgroundColor">Background Color</label>
                    <input
                        required
                        type="text"
                        name="backgroundColor"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="visibility">Visibility</label>
                    <input
                        required
                        type="text"
                        name="visibility"
                        value={visibility}
                        onChange={(e) => setVisibility(e.target.value)}
                    />
                </div>            
                <div >
                    <button type="submit">Create Board</button>
                </div>
            </form>
            </div>
            <div>
                <button className='cancel-button' onClick={handleClick}>Cancel</button>
            </div>
        </div>
    )
}

export default HomeCreateBoard