import React, { Component } from 'react';
import './Navbar.css';

//components
import Toggle from './toggle/Toggle.js';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="nav-container">
                <div className="nav">
                    <div className="brand">
                        <img className="brand-logo" src="/logo.png"></img>
                    </div>
                    <Toggle listener={this.props.sideToggle} />
                </div>
                <div className="sidenav">
                    <h1>Hello World</h1>
                </div>

            </div>
        );
    }
}
