import React, { Component } from 'react';
import SpaceBar from './SpaceBar';

class StatisticsListView extends Component {
    render() {
        const title = this.props.data.title;
        const list = this.props.data.list;

        return (
            <div>
                <h1>{title}</h1>
                <SpaceBar />
                <ul>
                    {
                        list.map((item, index) => {
                            return (
                                <li key={'item' + index}>
                                    <div style={{ paddingTop: "5px", fontSize: '15px', }}>
                                    {item.name} &emsp;&emsp;&emsp;{item.value}
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>

            </div>
        );
    }
}

export default StatisticsListView;
