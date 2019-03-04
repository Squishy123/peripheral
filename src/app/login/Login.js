import React from 'react';

import {Redirect} from 'react-router-dom';

import './Login.css';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log(process.env.REACT_APP_SERVER_HOST);

        this.state = {loginMessage: null}

        this.loginRequest = this.loginRequest.bind(this);
    }

    async loginRequest() {
        let email = document.querySelector('#email').value;
        let password = document.querySelector('#password').value;

        try {
            let access_token = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/users/authenticate`, {
                method: 'POST',
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({
                    email: email, 
                    password: password
                })
            }).then(res=>res.json());
            console.log(access_token)
            if(access_token.access_token) {
                this.props.cookies.set('access_token', access_token);
                this.setState({loginMessage: <Redirect push to="/dashboard"/>});
            } else {
            this.setState({loginMessage: <h4>{access_token.output.payload.message}</h4>})
            } 
        } catch (err) {
            console.log(err);
        }
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
                        <button className="button" type="button" onClick={this.loginRequest}>Login</button>
                        {this.state.loginMessage}
                    </form>
                </div>
            </div>
        )
    }
}