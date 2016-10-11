// @ flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { submitOrder } from '../actions/order'
import Main from '../components/suretyOrder/main'
import { browserHistory } from 'react-router'
class SuretyOrder extends Component {
    render() {
        const { submitOrder } = this.props
        return (
          <div>
            <Main
              submitOrder = {(arg) => submitOrder(arg)}>
            </Main>
          </div>
        )
    }
}
SuretyOrder.propTypes={

}
function mapStateToProps(state) {
    return {

    }
}
function mapDispatchToProps(dispatch) {
  return {
    submitOrder:(arg) => dispatch(submitOrder(arg))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SuretyOrder)
