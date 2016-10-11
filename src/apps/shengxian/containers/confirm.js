// @flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { inputPhone, confirmOrder } from '../actions'
import Main from '../components/confirm/main'
import Header from '../components/confirm/header'
import Footer from '../components/confirm/footer'
import { Modal } from '@boluome/blm-web-components'

class Confirm extends Component {
    componentWillMount() {
        document.title = '确认订单'
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.orderData.id !== this.props.orderData.id) return Modal('confirm', '下单成功，请及时付款')
    }
    render() {
        // const { phone, confirmParams, cinemaName, filmImg, location, confirmOrder, inputPhone } = this.props
        // const { filmName, date, time, type } = location.query
        // const { showDate, channel, count, seatNo, total } = confirmParams
        // if (!confirmParams.channel) return false
        return (
            <div>
                <Header />
                <Main />
                <Footer total = {15.8} canClick = {false} confirmOrder = {() => console.log(confirmParams)} />
            </div>
        )
    }
}

Confirm.propTypes = {
    confirmParams: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        confirmParams: state.confirm.confirmParams,
        phone: state.confirm.phone,
        orderData: state.confirm.orderData,
        cinemaName: '',//state.cinema.info.name,
        filmName: '',//state.detail.data.name,
        filmImg: ''//state.detail.data.pic
    }
}
function mapDispatchToProps(dispatch) {
    return {
        inputPhone: (phone) => dispatch(inputPhone(phone)),
        confirmOrder: (params, phone) => dispatch(confirmOrder(params, phone))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm)
