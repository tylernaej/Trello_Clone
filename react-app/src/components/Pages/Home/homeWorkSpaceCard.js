import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeBoardCard from "./homeBoardCard";
import { Modal } from '../../../context/Modal'
import HomeCreateBoard from "./homeCreateBoard";
import { NavLink, useLocation } from 'react-router-dom';
import './homeWorkSpaceCard.css'

function HomeWorkSpaceCard({workspace}) {
    const [wSBoards, setWSBoards] = useState(workspace.boards)
    const [showModal, setShowModal] = useState(false)

    const handleClick = e => {
        e.preventDefault()
        setShowModal(true)
    }

    let members = workspace.users.length === 1?'Member':'Members'

    return (
        <div id='workspace-exterior-container'>
            <div id='workspace-interior-container'>
                <div className="flex-row">
                    <div id='workspace-link'>
                        <NavLink 
                            to={`/home/w/${workspace.id}`}
                            style={{textDecoration: 'none'}}
                        >
                            <div id='workspace-name'>
                                <div id="first-letter-icon">
                                    {workspace.name[0]}
                                </div>
                                {workspace.name}
                            </div>
                        </NavLink>
                    </div>
                    <div id='boards-button'>
                        <NavLink
                            to={`/home/w/${workspace.id}`}
                            style={{
                                textDecoration: 'none',
                                color: 'rgb(50, 50, 50)'
                            }} 
                        >
                            Boards
                        </NavLink>
                    </div>
                    <div id='members-button'>
                        {workspace.users.length} {members}
                    </div>
                    <div id='settings-button'>
                        Settings
                    </div>                    
                </div>
                <div className="flex-row">
                    <div id='board-map' className="flex-row">
                        {wSBoards.map(board => (
                            <HomeBoardCard 
                                key={board.id} 
                                board={board} 
                                workspaceId={workspace.id}
                            />
                        ))}
                    </div>
                    <div>
                        <button onClick={handleClick}>Create New Board</button>
                        {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <HomeCreateBoard 
                                setShowModal={setShowModal} 
                                workspaceId={workspace.id}
                            />
                        </Modal>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeWorkSpaceCard