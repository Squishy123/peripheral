import React from 'react';

import { Link } from 'react-router-dom';

import './Dashboard.css';

import Groupcard from './groupcard/Groupcard.js';

import DataChart from './dataChart/DataChart.js';

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
        this.state = {
            dashboardState: state,
            login: false,
            groupCards: [],
            nodes: [],
            HP_outdoor_temperature: [],
            outdoorTemperatureChart: null,
            TH_indoor_temperature: [],
            indoorTemperatureChart: null,
            TH_heat_req_demand: [],
            interfaceBoardDataChart: null
        };

        this.expiryAccess = this.expiryAccess.bind(this);
        this.getGroups = this.getGroups.bind(this);
        this.getClusters = this.getClusters.bind(this);
        this.getOutdoorTemperature = this.getOutdoorTemperature.bind(this);
        this.getIndoorTemperature = this.getIndoorTemperature.bind(this);
        this.getInterfaceBoardData = this.getInterfaceBoardData.bind(this);
    }

    async expiryAccess() {
        try {
            let access_token = this.props.cookies.get('access_token').access_token;
            if (access_token) {
                let decoded = await jwt.decode(access_token);
                if (decoded.exp < Date.now().valueOf() / 1000) {
                    return true;
                } else {
                    this.setState({ login: true, access_token: access_token });
                }
            }
        } catch (err) {
            return false;
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

    async getCluster() {
        try {
            let cluster = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/cluster`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': this.state.access_token,
                    'group_id': this.props.match.params.group_id,
                    'cluster_id': this.props.match.params.cluster_id
                }
            }).then(res => res.json());
            this.setState({
                nodes: cluster.nodes
            });

        } catch (err) {
            console.log(err);
        }
    }

    async getOutdoorTemperature() {
        //do this for all the nodes and then combine the outdoor temperature thingey
        try {
            await Promise.all(this.state.nodes.map(async (n) => {
                let metas = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/metas`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'api_token': this.state.api_token,
                        'reading_name': 'HP_outdoor_temperature',
                        'node_id': n.node_id
                    }
                }).then(res => res.json());
                if (metas.length && this.state.HP_outdoor_temperature.length) {
                    this.setState({
                        HP_outdoor_temperature: this.state.HP_outdoor_temperature.concat([metas])
                    });
                } else if (metas.length && this.state.HP_outdoor_temperature.length == 0) {
                    this.setState({
                        HP_outdoor_temperature: metas
                    });
                }
            }));

            let data = {
                labels: this.state.HP_outdoor_temperature.map(m => m.created_at), datasets: [{
                    label: "HP_outdoor_temperature",
                    data: this.state.HP_outdoor_temperature.map(m => m.reading_value),
                    borderColor: 'cornflowerblue',
                    fill: false
                }
                ]
            };
            let chart = <DataChart type='line' data={data} options={{
                maintainAspectRatio: false,
                scales: { xAxes: [{ gridLines: { color: 'white' }, ticks: { fontColor: 'white' } }], yAxes: [{ gridLines: { color: 'white' }, ticks: { fontColor: 'white' } }] }, legend: {
                    labels: {
                        fontColor: 'white'
                    }
                }
            }} width="80vw" height="400px" />
            this.setState({ outdoorTemperatureChart: chart });
            //this.setState({groupCards: this.state.groupCards.concat([<div><h2>Outdoor Temperature</h2>{chart}</div>]), outdoorTemperatureChart: chart});
        } catch (err) {
            console.log(err);
        }
    }

    async getIndoorTemperature() {
        //do this for all the nodes and then combine the outdoor temperature thingey
        try {
            await Promise.all(this.state.nodes.map(async (n) => {
                let metas = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/metas`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'api_token': this.state.api_token,
                        'reading_name': 'TH_indoor_temperature',
                        'node_id': n.node_id
                    }
                }).then(res => res.json());
                if (metas.length && this.state.TH_indoor_temperature.length) {
                    this.setState({
                        TH_indoor_temperature: this.state.TH_indoor_temperature.concat([metas])
                    });
                } else if (metas.length && this.state.TH_indoor_temperature.length == 0) {
                    this.setState({
                        TH_indoor_temperature: metas
                    });
                }
            }));

            let data = {
                labels: this.state.TH_indoor_temperature.map(m => m.created_at), datasets: [{
                    label: "TH_indoor_temperature",
                    data: this.state.TH_indoor_temperature.map(m => m.reading_value),
                    borderColor: 'cornflowerblue',
                    fill: false
                }
                ]
            };
            let chart = <DataChart type='line' data={data} options={{
                maintainAspectRatio: false,
                scales: { xAxes: [{ gridLines: { color: 'white' }, ticks: { fontColor: 'white' } }], yAxes: [{ gridLines: { color: 'white' }, ticks: { fontColor: 'white' } }] }, legend: {
                    labels: {
                        fontColor: 'white'
                    }
                }
            }} width="80vw" height="400px" />
            this.setState({ indoorTemperatureChart: chart });
            //this.setState({groupCards: this.state.groupCards.concat([<div><h2>Outdoor Temperature</h2>{chart}</div>]), outdoorTemperatureChart: chart});
        } catch (err) {
            console.log(err);
        }
    }

    async getInterfaceBoardData() {
        //do this for all the nodes and then combine the outdoor temperature thingey
        try {
            await Promise.all(this.state.nodes.map(async (n) => {
                let metas = await fetch(`${process.env.REACT_APP_SERVER_HOST}/api/metas`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'api_token': this.state.api_token,
                        'reading_name': 'TH_heat_req_demand',
                        'node_id': n.node_id
                    }
                }).then(res => res.json());
                if (metas.length && this.state.TH_heat_req_demand.length) {
                    this.setState({
                        TH_heat_req_demand: this.state.TH_heat_req_demand.concat([metas])
                    });
                } else if (metas.length && this.state.TH_heat_req_demand.length == 0) {
                    this.setState({
                        TH_heat_req_demand: metas
                    });
                }
            }));

            let data = {
                labels: this.state.TH_heat_req_demand.map(m => m.created_at), datasets: [{
                    label: "TH_heat_req_demand",
                    data: this.state.TH_heat_req_demand.map(m => m.reading_value),
                    borderColor: 'cornflowerblue',
                    fill: false
                }
                ]
            };
            let chart = <DataChart type='line' data={data} options={{
                maintainAspectRatio: false,
                scales: { xAxes: [{ gridLines: { color: 'white' }, ticks: { fontColor: 'white' } }], yAxes: [{ gridLines: { color: 'white' }, ticks: { fontColor: 'white' } }] }, legend: {
                    labels: {
                        fontColor: 'white'
                    }
                }
            }} width="80vw" height="400px" />
            this.setState({ interfaceBoardDataChart: chart });
            //this.setState({groupCards: this.state.groupCards.concat([<div><h2>Outdoor Temperature</h2>{chart}</div>]), outdoorTemperatureChart: chart});
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
        this.setState({ dashboardState: state })
    }

    async componentDidMount() {
        let expiry = await this.expiryAccess();
        if (!expiry && this.state.dashboardState === 'select-group') {
            this.getGroups();
        } else if (!expiry && this.state.dashboardState === 'select-cluster') {
            this.getClusters();
        } else if (!expiry && this.state.dashboardState === 'select-node') {
            await this.getCluster();
            await Promise.all([this.getOutdoorTemperature(), this.getIndoorTemperature(), this.getInterfaceBoardData()]);
            //set update timer to every 2 minutes
            setInterval(async () => { return await this.getOutdoorTemperature() }, 120000);
            setInterval(async () => { return await this.getIndoorTemperature() }, 120000);
            setInterval(async () => { return await this.getInterfaceBoardData() }, 120000);
        }
    }

    render() {
        return (
            (this.state.login) ?
                <div className="dashboard">
                    <h1>Dashboard</h1>
                    <div className="group-cards-container">
                        {(this.state.dashboardState === 'select-group' || this.state.dashboardState === 'select-cluster') ?
                            (this.state.groupCards.length > 0) ? this.state.groupCards : <p>Grabbing Data...</p>
                            : null}
                        {(this.state.dashboardState === 'select-node') ? [
                            (this.state.outdoorTemperatureChart) ?
                                <div><h2>Outdoor Temperature</h2>{this.state.outdoorTemperatureChart}</div>
                                :
                                <p>Grabbing Data...</p>
                            ,

                            (this.state.indoorTemperatureChart) ?
                                <div><h2>Indoor Temperature</h2>{this.state.indoorTemperatureChart}</div>
                                :
                                <p>Grabbing Data...</p>
                            ,

                            (this.state.interfaceBoardDataChart) ?
                                <div><h2>Interface Board Data</h2>{this.state.interfaceBoardDataChart}</div>
                                :
                                <p>Grabbing Data...</p>
                        ] : null}
                    </div>
                </div>
                :
                <div className="dashboard">
                    <p>Token Expired</p>
                    <p>Please login <Link to="/login">here.</Link></p>
                </div>
        )
    }
}