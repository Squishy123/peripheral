import React from 'react';

import './Login.css';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log(process.env.REACT_APP_SERVER_HOST);
    }

    loginRequest() {
        let email = document.querySelector('#email').value;
        let password = document.querySelector('#password').value;


    }

    render() {
        return (
            <div className="centered-container">
                <div className="login-panel">
                    <form className="login-container">
                        <h1>Login</h1>
                        <label>Email: </label>
                        <input id="email" type="email" placeholder="me@email.com" />
                        <label>Password: </label>
                        <input id="password" type="password" placeholder="1234" autoComplete="current-password"/>
                        <button className="button" type="button" onClick="login()">Login</button>
                    </form>
                </div>
            </div>
        )
    }
}