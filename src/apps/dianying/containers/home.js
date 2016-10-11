// @ flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setCity, setPoint, changeHeaderTab, changeChannelTab } from '../actions'
import List from '../components/home/list'
import img_kou from 'images/ic_koudianying.png'
import img_zzw from 'images/ic_zhizhu.png'
import { Tabbar, Location, Modal, CitySearch, Icon } from '@boluome/blm-web-components'

class Home extends Component {
    componentWillMount() {
        const { setCity, setPoint, city, point, channel } = this.props

        if (!city.id) Modal('fullScreen', <CitySearch callback = {(result) => setCity(result)} api = { `${ window.$config.HOST }/dianying/v1/cities` } /> )

        if (point.length === 0) {
            let geolocation = new $config.BMap.Geolocation(); // 根据浏览器定位
            geolocation.getCurrentPosition((r) => {
              if(r.point) {
                localStorage.setItem('lat', r.point.lat)
                localStorage.setItem('lon', r.point.lng)
              }
            })
        }
	  }
    render() {
        const { headerCurrent, channelCurrent, changeHeaderTab, city, setCity } = this.props

        document.title = {
            0: '热映电影',
            1: '待映电影',
            2: '影院列表'
        }[headerCurrent]
        const headerTabs: Array<string> = ['热映', '待映', '影院']
        const headerContents: Array<Object> = [<Contents id = {0} />, <Contents id = {1} />, <Contents id = {2} />]
        return (
            <div>
              <div style={{ position: 'absolute', right: '10px', lineHeight: '48px', fontSize: '.8rem', color: '#ff9a00'}}
                   onClick={ () => Modal('fullScreen', <CitySearch callback = { (result) => { setCity(result); changeHeaderTab(headerCurrent, channelCurrent, result) } } api = { `${ window.$config.HOST }/dianying/v1/cities` } />) } >
                { city.name }
                <i style={{ border: '1px solid #ff9a00', borderTop: '0', borderRight: '0', transform: 'rotate(-45deg)', width: '5px', height: '5px', position: 'relative', marginLeft: '5px', display: 'inline-block', top: '-3px'}}></i>
              </div>
              <Tabbar type = 'header' tabs = {headerTabs} contents = {headerContents} current = {headerCurrent} onTabClick = {(idx) => changeHeaderTab(idx, channelCurrent, city)} />
            </div>
        )
    }
}

Home.propTypes = {
    current: PropTypes.number,
    changeHeaderTab: PropTypes.func.isRequired
}

export default connect(
    (state) => {
        return {
            city: state.home.city,
            point: state.home.point,
            headerCurrent: state.home.headerCurrent,
            channelCurrent: state.home.channelCurrent,
            channel: state.home.channel
        }
    },
    (dispatch) => {
        return {
            setCity : (city)  => dispatch(setCity(city))  ,
            setPoint: (point) => dispatch(setPoint(point)),
            changeHeaderTab: (idx, channelCurrent, city) => dispatch(changeHeaderTab(idx, channelCurrent, city))
        }
    }
)(Home)
// `https://dev-api.otosaas.com/dianying/v1/city?channel=${channel}`
// Contents
class Contents extends Component {
  componentWillMount() {
    const {data, changeChannelTab} = this.props
		if (data.length === 0) changeChannelTab(0, 0)
	}
	render() {
		const { id, headerCurrent, channelCurrent, changeChannelTab, data, channel, city } = this.props
		const channelTabs: Array<string> = [{ type: '抠电影', icon: img_kou }, { type: '蜘蛛网', icon: img_zzw }]
		const channelContents: Array<Object> = [<List type = { headerCurrent } data = { data } channel = {channel} city= {city} />, <List type = { headerCurrent } data = { data } channel = {channel} city= {city} />]
		return (
			<Tabbar type = 'channel' tabs = {channelTabs} contents = {channelContents} current = {channelCurrent} onTabClick = {(idx) => changeChannelTab(headerCurrent, idx, city)} />
		)
	}
}

Contents = connect(
    (state) => {
        return {
            city: state.home.city,
            point: state.home.point,
            headerCurrent: state.home.headerCurrent,
            channelCurrent: state.home.channelCurrent,
            channel: state.home.channel,
            data: state.home.listData
        }
    },
    (dispatch) => {
        return {
            changeChannelTab: (headerCurrent, idx, city) => dispatch(changeChannelTab(headerCurrent, idx, city))
        }
    }
)(Contents)
