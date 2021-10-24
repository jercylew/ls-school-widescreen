import React, { Component } from 'react';
import SpaceBar from './SpaceBar';

//TODO: Using redux or context to get the info from server
class StatisticsItemView extends Component {

    render() {
        const title = this.props.data.title;
        const unit = this.props.data.unit;
        const number = this.props.data.number;

        return (
            <div>
                <h1>{title}</h1>

                <SpaceBar />

                <div style={{ paddingTop: "5px", fontSize: '15px', }}>
                <span　className="Statistics">{number}</span>&nbsp;&nbsp;&nbsp;&nbsp;{unit}</div>
            </div>
        );
    }
}

export default StatisticsItemView;
