import React, { Component } from 'react';
import Iframe from 'react-iframe'

class Background extends Component {
    render() {
        return (
            <div className="canvas" style={{ opacity: .2 }}>
                <Iframe url="index.html"
                    width="100%"
                    height="100%"/>
            </div>
        );
    }
}

export default Background;
