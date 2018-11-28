import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div className="nav">
                <div className="brand">
                    <img className="brand-logo" src="/logo.png"></img>
                </div>
                <div className="console" onclick="toggleLogin()">
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
            </div>
        );
    }
}

export default Navbar;
