import React from 'react'
import request from 'superagent'
import classnames from 'classnames'
import style from './style.css'

export default class Tabbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.point !== this.props.point) this.fetchData(nextProps.point)
    // }
    // fetchData(point) {
    //     request
    //     .get(HOST + '/waimai/v1/restaurants?supplier=ele&lng=' + point[0] + '&lat=' + point[1])
    //     .end((err, res) => {
    //         if (!err && res.statusCode == 200) {
    //             if (res.body.code != 0) return alert(res.body.message)
    //             this.setState({data: res.body.data})
    //         }
    //     })
    // }
    render() {
        return (
            <ul className = {style.tabbar}>
              <li className = {classnames(style.item, this.props.showMenu ? style.active: '')} onClick = {() => this.props.onSwitchTab('menu')}>菜单</li>
              <li className = {classnames(style.item, !this.props.showMenu ? style.active: '')} onClick = {() => this.props.onSwitchTab('intro')}>商家</li>
            </ul>
        )
    }
}
