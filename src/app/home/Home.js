import React from 'react';

import './Home.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home">
                <h1>Cortex Panel</h1>
                <div className="card-container">
                    <div className="card">
                        <h2>Clusters</h2>
                </div>
                    <div className="card">
                        <h2>Login</h2>
                </div>
                    <div className="card">
                        <h2>Register</h2>
                </div>
                </div>
            </div>
        )
    }
}