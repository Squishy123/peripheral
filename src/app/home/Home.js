import React from 'react';

import './Home.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="centered-container">
                <img className="logo-image" src="logo.png" />
                <div className="main-panel">
                    <h1 className="title bold">Cortex</h1>
                    <p className="subtitle light"><span className="grey">All your</span> IoT <span className="grey">on one </span>stack</p>
                    <a className="button" href="https://github.com/Squishy123/cortex">Check it Out Here</a>
                </div>
            </div>

        )
    }
}