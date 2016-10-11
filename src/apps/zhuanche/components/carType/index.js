import React, {Component} from 'react';
import localStyle from './styles.css';
import classnames from 'classnames';

export class CarType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            getPrices: []
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.prices !== nextProps.prices) {
            if (nextProps.prices.didi) {
                this.setState({
                    getPrices: nextProps.prices.didi
                });
                this.props.sign(nextProps.prices.didi[0]);
            } else if (nextProps.prices.yidao) {
                this.setState({
                    getPrices: nextProps.prices.yidao
                });
            }
        }
    }
    render() {
        const carType = this.props.service.carType;
        return (
            <div className={localStyle.elementDiv}>
                <div className={localStyle.elementContent}>
                    {carType.map((val, idx) => <span style={{color: idx == this.props.choseCarType ?  '#FF9A00' : ''}} className={localStyle.carType} onClick={() => {this.props.callback(idx); this.props.sign(this.state.getPrices[idx]) }} key={idx}>{val.name}</span>)}
                </div>
                {this.state.getPrices.length > 0 && this.state.getPrices !== 'undefined' ? <span className={localStyle.carPrice}>预估 <span style={{color: '#FF9A00'}}>{this.state.getPrices[this.props.choseCarType].price}</span></span> : ''}
            </div>
        )
    }
}