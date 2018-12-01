import React from 'react';

import { Link } from 'react-router-dom';

import './Dashboard.css';

import Groupcard from './groupcard/Groupcard.js';

const jwt = require('jsonwebtoken');

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        let state = "select-group";
        //determine which of the 3 states we are in
        if (props.match.params.group_id) {
            state = "select-cluster";
            if (props.match.params.cluster_id) {
                state = "select-node";
            }
        }
        console.log(state);
        this.state = { dashboardState: state, login: false, groupCards: [] };

        this.expiryAccess = this.expiryAccess.bind(this);
        this.getGroups = this.getGroups.bind(this);
        this.getClusters = this.getClusters.bind(this);
    }

    async expiryAccess() {
        let access_token = this.props.cookies.get('access_token').access_token;
        if (access_token) {
            this.setState({ login: true, access_token: access_token });
            let decoded = await jwt.decode(access_token);

            if (!decoded.exp > Date.now()) {
                return true;
            }
        }
        return false;
    }

    async getGroups() {
        try {
            let groups = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/groups`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'access_token': this.state.access_token
                },
            }).then(res => res.json());
            if (groups.length > 0) {
                groups.forEach(e => {
                    let card = <Groupcard name={e.name} description={e.description} group_id={e._id} />;
                    this.setState({
                        groupCards: this.state.groupCards.concat([card])
                    });
                });
            } else {
                this.setState({
                    groupCards: this.state.groupCards.concat([<h1>No Clusters Here...</h1>])
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    async getClusters() {
        try {
            let clusters = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/clusters`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': this.state.access_token,
                    'group_id': this.props.match.params.group_id
                }
            }).then(res => res.json());
            if (clusters.length > 0) {
                clusters.forEach(e => {
                    let card = <Groupcard name={e.name} description={e.description} group_id={`${this.props.match.params.group_id}/${e._id}`} />;
                    this.setState({
                        groupCards: this.state.groupCards.concat([card])
                    });
                });
            } else {
                this.setState({
                    groupCards: this.state.groupCards.concat([<h1>No Clusters Here...</h1>])
                });
            }

        } catch (err) {
            console.log(err);
        }
    }

    async checkState() {
        let state = "select-group";
        //determine which of the 3 states we are in
        if (this.props.match.params.group_id) {
            state = "select-cluster";
            if (this.props.match.params.cluster_id) {
                state = "select-node";
            }
        }
        this.setState({dashboardState: state})
    }

    async componentDidMount() {
        let expiry = await this.expiryAccess();
        if (!expiry && this.state.dashboardState === 'select-group') {
            this.getGroups();
        } else if (!expiry && this.state.dashboardState === 'select-cluster') {
            this.getClusters();
        }
    }

    render() {

        return (
            (this.state.login) ?
                <div className="dashboard">
                    <h1>Dashboard</h1>
                    <div className="group-cards-container">
                        {this.state.groupCards}
                    </div>
                </div>
                :
                <div className="dashboard">
                    <p>Please login <Link to="/login">here.</Link></p>
                </div>
        )
    }
}