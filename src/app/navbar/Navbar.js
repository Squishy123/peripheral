import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div className="menu-container">
                <img src="peripheral-logo.png" className="menu-logo" />
                <ul className="menu-pages">
                    <li className="menu-page">
                        <a href="#" className="menu-link">Overview</a>
                    </li>
                    <li className="menu-page">
                        <a href="#" className="menu-link">Manage</a>
                    </li>
                    <li className="menu-page">
                        <a href="#" className="menu-link">About</a>
                    </li>
                    <li className="menu-page">
                        <a href="#" className="menu-link">Account</a>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Navbar;
