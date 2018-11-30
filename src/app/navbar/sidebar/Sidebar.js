import React, { Component } from 'react';
import './Sidebar.css';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        // this.state = { expand: (props.expand) ? props.expand : false };

    }

    render() {
        return (
            <div className={(!this.props.expand) ? "sidenav " : "sidenav expand"}>
                <ul className="sidenav-pages">
                    <li className="sidenav-page">
                        <a href="/">Home</a>
                    </li>
                    <li className="sidenav-page">
                        <a href="/login">Login</a>
                    </li>
                    <li className="sidenav-page">
                        <a href="/dashboard">Dashboard</a>
                    </li>
                    <li className="sidenav-page">
                        <a href="#">Settings</a>
                    </li>
                </ul>
            </div>
        )
    }
}