import React, { Component } from 'react';
import './Navbar.css';

//components
import Toggle from './toggle/Toggle.js';
import Sidebar from './sidebar/Sidebar.js';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {sideToggle: props.sideToggle};

        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar() {
        this.setState({sideToggle: !this.state.sideToggle});
    }

    render() {
        return (
            <div className="nav-container">
                <div className="nav">
                    <div className="brand">
                        <a href="/"><img className="brand-logo" src="/logo.png"></img></a>
                    </div>
                    <Toggle listener={this.toggleSidebar} toggle={this.state.sideToggle}/>
                </div>
                <Sidebar expand={this.state.sideToggle} />
            </div>
        );
    }
}
