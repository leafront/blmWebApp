// @ flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getNearStores, enterStore } from '../actions'
import NearStores from '../components/home/near_stores'
import { Tabbar, Location } from '@boluome/blm-web-components'

class Home extends Component {
    componentWillMount() {
        const { channel, getNearStores, page } = this.props
        document.title = '外卖'
        if (!localStorage.lat) {
            Location((lon, lat) => {
                getNearStores(channel, lon, lat, page)
                localStorage.setItem('lon', lon)
                localStorage.setItem('lat', lat)
            })
        } else {
            getNearStores(channel, localStorage.lon, localStorage.lat, page)
        }
    }
    render() {
        const { stores, channel, channelCurrent, onEnterStore, getNearStores, page } = this.props
        const channelTabs: Array<string> = ['饿了么']
        const channelContents: Array<Object> = [<div><NearStores stores = {stores} page = {page} channel = {channel} getNearStores = {(a, b, c, d) => getNearStores(a, b, c, d)} /></div>]
        return (
            <Tabbar type = 'channel' tabs = {channelTabs} contents = {channelContents} current = {channelCurrent} />
        )
    }
}

function mapStateToProps(state) {
    return {
        channel: state.home.channel,
        stores: state.home.stores,
        channelCurrent: state.home.channelCurrent,
        page: state.home.page
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getNearStores: (a, b, c, d) => dispatch(getNearStores(a, b, c, d)),
        enterStore: (id, name, pay, invoice) => dispatch(enterStore(id, name, pay, invoice))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
