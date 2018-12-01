import React from 'react';

import { Link } from 'react-router-dom';

import './Groupcard.css';

export default class Groupcard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="group-card">
                <h2 className="card-title">{this.props.name}</h2>
                <p className="card-description">{this.props.description}</p>
                <a className="card-link button" href={`/dashboard/${this.props.group_id}`} >Go To</a>
            </div>
        )
    }
}