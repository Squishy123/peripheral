import React, { Component } from 'react';
import './Toggle.css';

class Toggle extends Component {
    constructor(props) {
        super(props);
        this.state = { toggle: (props.toggle) ? props.toggle : false };

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({ toggle: !this.state.toggle });
        
        if(this.props.listener)
            this.props.listener = this.state.toggle;

    }

    render() {
        return (
            <div className="toggle" onClick={this.toggleMenu}>
                    <div className={!this.state.toggle ? "bar1" : "toggle bar1"}></div>
                    <div className={!this.state.toggle ? "bar2" : "toggle bar2"}></div>
                    <div className={!this.state.toggle ? "bar3" : "toggle bar3"}></div>
            </div>
        )
    }
}

export default Toggle;