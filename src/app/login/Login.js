import React from 'react';

import './Login.css';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="centered-container">
                <div className="login-panel">
                    <div className="login-container">
                        <h1>Login</h1>
                        <label>Email: </label>
                        <input id="email" type="email" placeholder="me@email.com" />
                        <label>Password: </label>
                        <input id="password" type="password" placeholder="1234" />
                        <button className="button" onclick="login()">Login</button>
                    </div>
                </div>
            </div>
        )
    }
}