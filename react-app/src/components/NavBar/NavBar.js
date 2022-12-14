import React, { useState, useEffect } from "react";
import { NavLink, useParams, useLocation } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import ProfileButton from './profileDropDown/profileButton';
import './NavBar.css'
import img from '../../assets/Stratify_clear.png'
import { useSelector, useDispatch } from 'react-redux';
import { getAllBoardsOfWorkspaceThunk } from "../../store/activeWorkspace";

const NavBar = () => {
  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)
  const sessionUser = useSelector(state => state.session.user)
  const workspace = useSelector(state => state.activeWorkspace.workspace)
  const location = useLocation()
  const boardId = Number(location.pathname.split('/')[4])
  const workspaceId = Number(location.pathname.split('/')[2])
  const activeBoard = useSelector(state => state.activeWorkspace.workspace?
                                  state.activeWorkspace.workspace.boards.find(board => board.id === boardId)
                                  : null)
  const [color, setColor] = useState('6a8e95')

  useEffect(() => {
    dispatch(getAllBoardsOfWorkspaceThunk(workspaceId))
    .then(() => setIsLoaded(true))
  }, [dispatch])

  useEffect(() => {
    if(activeBoard?.backgroundColor){
      setColor(activeBoard.backgroundColor)
    }
  }, [activeBoard])

  return (
    <div 
      id='nav-bar-container'
      style={{
        background: `linear-gradient(0.25turn,#${color}, #${color}, #${color})`,
      }}
    >
      <nav className='flex-row' id='nav-bar-nav'>
        <div >
          <NavLink 
            to={sessionUser?'/home':'/'} 
            exact={true} 
            activeClassName='active'
            style={{textDecoration: 'none'}}
          >
            <img src={img} id='home-button'></img>
          </NavLink>
        </div>
        <div 
          id='nav-utilities' 
          className='flex-row'
        >
          <div>
            <ProfileButton />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
