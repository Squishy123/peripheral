import React, { Component } from 'react';
import './Navbar.css';

//components
import Toggle from './toggle/Toggle.js';

class Navbar extends Component {
    render() {
        return (
            <div className="nav">
                <div className="brand">
                    <img className="brand-logo" src="/logo.png"></img>
                </div>
                <Toggle/>
            </div>
        );
    }
}

export default Navbar;
