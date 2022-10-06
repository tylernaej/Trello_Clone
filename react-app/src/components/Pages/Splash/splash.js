import React from "react";
import tiles from '../../../assets/cells.jpg'
import './splash.css'

function Splash() {

    return (
        <div id='splash-exterior-container'>
            <div id="splash-main" className="splash-main"
                style={
                    {
                        backgroundImage: `url(${tiles})`,
                    }
                }>
                <div className="w30 flex-row-center flex-row-align-center" style={{ color: "white"}}>
                    <div>
                        <div>
                            <h1 id="splash-header">Welcome to Stratify</h1>
                        </div>
                        <div>
                            Get Started
                        </div>
                    </div>
                </div>
            </div>
            <div id="splash-footer" className="flex-row-center">
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
                        <li><a style={{textDecoration:"none", color: "white"}} href="https://github.com/tylernaej" target="_blank" rel="noreferrer noopener">GitHub</a></li>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Splash