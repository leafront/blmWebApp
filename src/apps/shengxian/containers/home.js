// @ flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getCates, setCity } from '../actions'
import List from '../components/home/list'
import Cart from '../components/home/cart'
import { Tabbar, Modal, Search } from '@boluome/blm-web-components'

class Home extends Component {
    componentWillMount() {
        const { setCity, channel, areaId } = this.props
        document.title = '商品分类'
        if (!areaId) {
            Modal('fullScreen', (
                <div>
                    <a className = 'modal-close'>取消</a>
                    <Search type="city" styles={{width: "200px", height: '40px', margin: '1rem', borderRadius: '5px', border: "1px solid gray", padding: '0.3rem'}}
                         searchListStyle={{width: '200px'}} callback = {(result) => {setCity(result.supplier.shengxian[channel])}} api={'common/v1/cities'} />
                </div>
            ))
        }
    }
    componentWillUpdate(nextProps) {
        const { channel, getCates } = this.props
        if (nextProps.areaId && nextProps.areaId !== this.props.areaId) getCates(channel, nextProps.areaId)
    }
    render() {
        const { cates, areaId, channel } = this.props
        const channelTabs: Array<string> = ['易果生鲜']
        const channelContents: Array<Object> = [<div><List cates = { cates } channel = { channel } areaId = { areaId } /><Cart /></div>]
        return (
            <Tabbar type = 'channel' tabs = {channelTabs} contents = {channelContents} current = {0} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
