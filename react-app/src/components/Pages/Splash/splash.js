import React, { useEffect, useState } from "react";
import './splash.css'
import todo from '../../../assets/todo_clear.png'
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearWorkspaces } from "../../../store/workspace";

function Splash() {
    const [email, setEmail] = useState('')
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(clearWorkspaces())
    })

    if(sessionUser){
        history.push('/home')
    }

    return (
        <div id='splash-exterior-container'>
            <div id="splash-main" className="splash-main">
                <div className="w30 flex-row-center flex-row-align-center" id='above-background'>
                    <div id='splash-content-container'>
                        <div id='splash-content-inner-container'>
                            <div>
                                <h1 id="splash-header">
                                    A project management tool that you'll actually want to use
                                </h1>
                            </div>
                            <div id='talking-points'>
                                <div>
                                    <div id='let-stratify'>
                                        Let Stratify keep your tasks and projects together, so your team can focus on the substance of doing.
                                    </div>
                                    <div id='let-stratify'>
                                        Turn your teams to-do lists into living documents. Start with a board, lists, and cards. Customize and expand with more features as your teamwork grows.  
                                    </div>
                                    <div id='let-stratify'>
                                        Manage projects, organize tasks, and build team spirit — all in one place.
                                    </div >
                                </div>
                                <img src={todo} id='to-do-image'/>
                            </div>
                            <div>
                                <div id='get-organized-today'>
                                    Get organized today - It's Free!
                                </div>
                                <div>
                                    <div style={{marginBottom:'15px'}}>
                                        <label id='email-label'>Email:</label>
                                    </div>
                                    <input
                                        type='text'
                                        id='email-input'
                                        name='email'
                                        onChange={(e)=>setEmail(e.target.value)}
                                        value={email}
                                    ></input>
                                    <NavLink
                                    id='signup-button' 
                                    to={{
                                        pathname:'/sign-up',
                                        email: `${email}`
                                    }}
                                    >
                                        Sign up
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div id="splash-footer" className="flex-row-center">
                <div className="flex-row-justify-between w70">
                    <div>
                        <h5>
                            About
                        </h5>
                            <li><a style={{textDecoration:"none", color: "white"}} href="https://github.com/tylernaej/Trello_Clone" target="_blank" rel="noreferrer noopener">GitHub repository</a></li>
                            <li><a style={{textDecoration:"none", color: "white"}} href="https://github.com/tylernaej/Trello_Clone/wiki" target="_blank" rel="noreferrer noopener">Project wiki</a></li>
                    </div>
                    <div>
                        <h5>
                            Dev: Tyler Jean
                        </h5>
                        <div id='github-link'><a style={{textDecoration:"none", color: "white"}} href="https://github.com/tylernaej" target="_blank" rel="noreferrer noopener"><i className="fa-brands fa-github fa-2xl"/></a></div>
                        <div id='linkedin-link'><a style={{textDecoration:"none", color: "white"}} href='https://www.linkedin.com/' target="_blank" rel="noreferrer noopener"><i className="fa-brands fa-linkedin fa-2xl"/></a></div>            
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Splash