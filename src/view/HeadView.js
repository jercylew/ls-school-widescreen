import React, { Component } from 'react';

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
        const y = datetime.getFullYear();
        const mt = datetime.getMonth() + 1;
        const day = datetime.getDate();
        const h = datetime.getHours(); 
        const m = datetime.getMinutes();
        const s = datetime.getSeconds();

        return (
            <div className="head">
                <h1>深圳市龙岗区黄阁翠苑幼儿园智慧用电信息化系统</h1>
                {/* <div className="weather">
                    <span id="showTime">{y + "-" + mt + "-" + day + "  " + h + ":" + m + ":" + s}</span>
                </div> */}
            </div>
        );
    }
}

export default HeadView;
