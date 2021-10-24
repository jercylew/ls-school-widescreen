import React, { Component } from 'react';

class BorderredDigitView extends Component {
    render() {
        const number = this.props.number;
        const unit = this.props.unit;
        let number_array = number.toString().split("");

        return (
            <div style={{textAlign: 'center'}}>
                {
                    number_array.map((item, index) => {
                        return (
                            <div className='square' key={'item'+index}>
                                {item}
                            </div>
                        );
                    })
                }
                <div className='unit'>
                    {unit}
                </div>
            </div>
        );
    }
}

export default BorderredDigitView;
