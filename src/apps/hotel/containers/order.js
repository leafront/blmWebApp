// @ flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { submitOrder , checkCreditCard , getIpAddress } from '../actions/order'
import Main from '../components/order/main'
import { browserHistory } from 'react-router'
class Order extends Component {
    constructor(props){
      super(props)
    }
    componentWillMount(){
      const { getIpAddress } = this.props
      getIpAddress()
    }
    render() {
        const { submitOrder , location , checkCreditCard , ipInfo } = this.props
        const ipAddress = ipInfo.Ip
        const channel = location.query.channel
        return (
          <div>
            <Main
              ipAddress = { ipAddress }
              channel = { channel }
              checkCreditCard = {(channel,cardId) => checkCreditCard(channel,cardId)}
              submitOrder = {(arg) => submitOrder(arg)}>
            </Main>
          </div>
        )
    }
}
Order.propTypes={
  cardInfo:PropTypes.object.isRequired,
  ipInfo:PropTypes.object.isRequired
}
function mapStateToProps(state) {
    return {
      cardInfo:state.order.cardInfo,
      ipInfo:state.order.ipInfo
    }
}
function mapDispatchToProps(dispatch) {
  return {
    submitOrder:(arg) => dispatch(submitOrder(arg)),
    checkCreditCard:(channel,cardNo) => dispatch(checkCreditCard(channel,cardNo)),
    getIpAddress:() => dispatch(getIpAddress())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Order)
