// @ flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getCates, setCity } from '../actions'
import List from '../components/cart/list'
import Footer from '../components/cart/footer'
// import { Tabbar, Modal, Search } from '@boluome/blm-web-components'

class Cart extends Component {
    componentWillMount() {
        // const { setCity, channel } = this.props
        document.title = '购物车'
    }
    // componentWillUpdate(nextProps) {
    //     const { channel, getCates } = this.props
    //     if (nextProps.areaId && nextProps.areaId !== this.props.areaId) getCates(channel, nextProps.areaId)
    // }
    render() {
        // const { cates, areaId, channel } = this.props
        const goods = [
            {
                "commodityId": "ad7f227d-73c0-44a2-9edd-924006deb134",
                "commodityCode": "12125",
                "commodityName": "火龙果",
                "price": 12.00,
                "spec": "2.5kg/箱",
                "commodityPicList": [
                    {
                        "picUrl": "http://img14.yiguoimg.com/e/items/2016/160513/9288694155452589_500.jpg"
                    }
                ]
            },{
                "commodityId": "ad7f227d-73c0-44a2-9edd-924006deb134",
                "commodityCode": "12125",
                "commodityName": "火龙果",
                "price": 12.00,
                "spec": "2.5kg/箱",
                "commodityPicList": [
                    {
                        "picUrl": "http://img14.yiguoimg.com/e/items/2016/160513/9288694155452589_500.jpg"
                    }
                ]
            }
        ]
        // const channelContents: Array<Object> = [<div><List cates = { cates } channel = { channel } areaId = { areaId } /><Cart /></div>]
        return (
            <div>
                <List goods = {goods} />
                <Footer total = {15.2} confirmOrder = {() => console.log('confirmOrder func!')} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        channel: state.home.channel,
        cates: state.home.cates,
        areaId: state.home.areaId
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setCity: (areaId) => dispatch(setCity(areaId)),
        getCates: (channel, areaId) => dispatch(getCates(channel, areaId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
