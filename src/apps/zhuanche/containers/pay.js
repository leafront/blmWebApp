import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Icon } from '@boluome/blm-web-components';
import { getOrderDetail, getCancelOrder } from '../actions';

class Pay extends React.Component {
    render() {
        return (
            <div>pay</div>
        )
    }
}
const mapPropsToState = (state) => {
    return {
    }
};
const dispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapPropsToState, dispatchToProps)(Pay);