import React, { Component } from 'react';
import loadingGif from '../picture/loading.gif'

class LoadingView extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            isShowing: true
        };

        this.state = this.initialState;
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.fadeoff(),
          500
        );
      }

      fadeoff() {
        this.setState({
            isShowing: false
        });
        clearInterval(this.timerID);
      }

    render() {
        const { isShowing } = this.state;
        return (
            <div className={`${isShowing ? 'loading' : 'loadingStop'}`} >
                <div className="loadbox">
                    <img src={loadingGif} alt="Loading" />
                    页面加载中...
                </div>
            </div>
        );
    }
}

export default LoadingView;
