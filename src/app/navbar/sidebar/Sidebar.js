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
            </div>
        )
    }
}