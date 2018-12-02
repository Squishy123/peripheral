import React from 'react';

import Chart from 'chart.js'

export default class DataChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {type: props.type, data: props.data, options: props.options};
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');

        let chart = new Chart(ctx, {
            type: this.state.type,
            data: this.state.data,
            options: this.state.options
        });

        this.setState({chart: chart});
    }

    render() {
        return (
            <div style={{margin: 'auto', width: this.props.width, height: this.props.height}}>
            <canvas ref="canvas"/>
            </div>
        )
    }
}