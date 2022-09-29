import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeBoardCard from "./homeBoardCard";
import { Modal } from '../../../context/Modal'
import HomeCreateBoard from "./homeCreateBoard";

function HomeWorkSpaceCard({workspace}) {
    const [wSBoards, setWSBoards] = useState(workspace.boards)
    const [showModal, setShowModal] = useState(false)

    const handleClick = e => {
        e.preventDefault()
        setShowModal(true)
    }

    console.log(showModal)

    return (
        <div>
            <div>
                <div>
                    {workspace.name}
                </div>
                <div>
                    {workspace.users.length} Members
                </div>
                
            </div>
            <div>
                {wSBoards.map(board => (
                    <HomeBoardCard key={board.id} board={board}/>
                ))}
            </div>
            <div>
                <button onClick={handleClick}>Create New Board</button>
                {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <HomeCreateBoard setShowModal={setShowModal}/>
                </Modal>
                )}
            </div>
        </div>
    )
}

export default HomeWorkSpaceCard