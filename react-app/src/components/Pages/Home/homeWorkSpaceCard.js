import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeBoardCard from "./homeBoardCard";
import { Modal } from '../../../context/Modal'
import HomeCreateBoard from "./homeCreateBoard";
import { NavLink, useLocation } from 'react-router-dom';

function HomeWorkSpaceCard({workspace}) {
    const [wSBoards, setWSBoards] = useState(workspace.boards)
    const [showModal, setShowModal] = useState(false)

    const handleClick = e => {
        e.preventDefault()
        setShowModal(true)
    }

    return (
        <div>
            <div>
                <div>
                    <NavLink 
                        to={`/w/${workspace.id}`}
                    >
                        {workspace.name}
                    </NavLink>
                </div>
                <div>
                    {workspace.users.length} Members
                </div>
                
            </div>
            <div>
                {wSBoards.map(board => (
                    <HomeBoardCard key={board.id} board={board} workspaceId={workspace.id}/>
                ))}
            </div>
            <div>
                <button onClick={handleClick}>Create New Board</button>
                {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <HomeCreateBoard setShowModal={setShowModal} workspaceId={workspace.id}/>
                </Modal>
                )}
            </div>
        </div>
    )
}

export default HomeWorkSpaceCard