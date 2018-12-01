import React from 'react';

import Chart from 'chart.js'

export default class DataChart extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');

        let chart = new Chart(ctx, {
            type: this.props.type,
            data: this.props.data,
            options: this.props.options
        });
    }

    render() {
        return (
            <div style={{margin: 'auto', width: this.props.width, height: this.props.height}}>
            <canvas ref="canvas"/>
            </div>
        )
    }
}