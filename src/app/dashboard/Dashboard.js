import React from 'react';

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

        this.state = { dashboardState: state };
    }

    render() {
        return (
            <div>
                <h1>Peripheral Dashboard</h1>
            </div>
        )
    }
}