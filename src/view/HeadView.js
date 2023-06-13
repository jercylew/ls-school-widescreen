import React, { Component } from 'react';
import { dateToDateTimeString } from '../lib/DateUtil';

class HeadView extends Component {

    constructor(props) {
        super(props);
        
        this.initialState = {
            datetime: new Date()
        };

        this.state = this.initialState;
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
      }
    
      componentWillUnmount() {
        clearInterval(this.timerID);
      }

      tick() {
        this.setState({
            datetime: new Date()
        });
      }

    render() {
        const { datetime } = this.state;
        const timeStr = dateToDateTimeString(datetime);

        return (
            <div className="head">
                <h1>智慧平安校园</h1>
                <div className="datetime">
                    <span>{timeStr}</span>
                </div>
            </div>
        );
    }
}

export default HeadView;
