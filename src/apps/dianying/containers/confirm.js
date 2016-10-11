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
        const { phone, confirmParams, cinemaName, filmImg, location, confirmOrder, inputPhone, film, cinema, plan } = this.props
        const { filmName, date, time, type } = location.query
        const { showDate, channel, count, seatNo, total } = confirmParams
        if (!confirmParams.channel) return false
        return (
            <div>
                <Header showDate = {showDate} seatNo = {seatNo} { ...film } cinema={ cinema } plan={ plan } filmName = {filmName} cinemaName = {cinemaName} date = {date} time = {time} type ={type} filmImg = {filmImg} />
                <Main channel = {channel} count = {count} total = {total} phone = {phone} _change = {(evt) => inputPhone(evt.target.value)} />
                <Footer total = {total} phone = {phone} confirmOrder = {() => confirmOrder(confirmParams, phone)} />
            </div>
        )
    }
}

Confirm.propTypes = {
    confirmParams: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    let film   = JSON.parse(localStorage.getItem('film'))
    let cinema = JSON.parse(localStorage.getItem('cinema'))
    let plan   = JSON.parse(localStorage.getItem('plan'))

    return {
        confirmParams: state.confirm.confirmParams,
        phone: state.confirm.phone,
        orderData: state.confirm.orderData,
        cinemaName: state.cinema.info.name,
        filmName: state.detail.data.name,
        film,
        cinema, plan
    }
}
function mapDispatchToProps(dispatch) {
    return {
        inputPhone: (phone) => dispatch(inputPhone(phone)),
        confirmOrder: (params, phone) => {
          localStorage.removeItem('selectedSeat')
          dispatch(confirmOrder(params, phone))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm)
