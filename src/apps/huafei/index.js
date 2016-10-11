import React, { Component } from 'react'
import request from 'superagent'
import { browserHistory } from 'react-router'
import style from './style.css'
import classnames from 'classnames'
import { Button, Loading } from '@boluome/blm-web-components'

class App extends Component {
    constructor(props) {
        super(props)
    }
    reset() {
      this.setState({
        info: {
          list: [
            {display: '30元'},
            {display: '50元'},
            {display: '100元'},
            {display: '200元'},
            {display: '300元'},
            {display: '500元'}
          ]
        },
        total: 0,
        bLoading: false,
        bData   : false,
        selected: {}
      })
    }
    componentWillMount() {
      this.reset()
    }
    componentDidMount() {
        document.title = '话费充值'

        this.refs.phoneInput.focus()
    }
    getPrice(phone) {
        this.setState({ bLoading: true, bData: false })
        request.get(`${window.$config.HOST}/huafei/v1/${phone}/prices`).end((err, res) => {
            if (!err && res.statusCode === 200) {
                if (res.body.code !== 0) return alert(JSON.stringify(res.body.message))
                const info = res.body.data
                this.setState({ info: info, selected: info.list[0], total: info.list[0].price, bLoading: false, bData: true })
            } else {
                alert('网络状况不好')
            }
        })
    }
    _select(option) {
        this.setState({ selected: option, total: option.price })
    }
    confirmOrder(selected) {
        request.post(`${window.$config.HOST}/huafei/v1/order`, {
            customerUserId: 'blm001',
            cardId: selected.id,
            phone: this.refs.phoneInput.value,
            realPrice: selected.realPrice,
            price: selected.price,
            isp: this.state.info.isp,
            area: this.state.info.area
        })
        .set('Authorization', 'f225a9a9e46dd2b4602fd466adb7054e')
        .set('ID', 'blm001')
        .end((err, res) => {
            if (!err && res.statusCode === 200) {
                if (res.body.code !== 0) return alert(JSON.stringify(res.body.message))
                browserHistory.push(`/cashier/${res.body.data.id}`)
            } else {
                alert('网络状况不好')
            }
        })

    }
    render() {
        const { info, total, selected, bData, bLoading } = this.state
        const { area = '', isp = '' } = info
        const list = info.list

        return (
          <div className = {style.main}>
            <div className = {style.wrap}>
                <div className = {style.input}>
                    <input type='tel' placeholder = '请输入要充值的手机号' ref = 'phoneInput' maxLength='11'
                    onKeyUp = {() => {
                        const value = this.refs.phoneInput.value
                        value && value.length === 11 ? this.getPrice(value) : this.reset()
                    }} />
                    <span className={ classnames('', bLoading ? style.green : '') }>{ bLoading ? '加载中...' : `${ area } ${ isp }` }</span>
                </div>
                { list.length === 0 ? <Loading /> :
                    <div className={ `${ style.list } ${ bData ? style.active : '' }` } >
                        <div className = { style.row } >
                            { list.slice(0, 3).map((ele, idx) => <Option key = {idx} data = {ele} selected = {selected} _select = {!total ? (evt) => evt.stopPropagation() : (evt, option) => this._select(option)} />) }
                        </div>
                        <div className = {style.row}>
                            { list.slice(3, 6).map((ele, idx) => <Option key = {idx} data = {ele} selected = {selected} _select = {!total ? (evt) => evt.stopPropagation() : (evt, option) => this._select(option)} />) }
                        </div>
                    </div>
                }
            </div>
            <footer className = { style.footer }>
                <span className = { style.total }>￥{ total ? total : '--' }</span>
                <span className = { classnames(style.confirm, !total ? style.disabled : '') } onClick = {!total ? (evt) => evt.stopPropagation() : () => this.confirmOrder(selected)}>立即充值</span>
            </footer>
          </div>
        )
    }
}

const Option = ({data, selected, _select}) => {
    return (
        <section onClick = {(evt) => _select(evt, data)} className = { data === selected ? style.selected : '' }>
            <span className = {style.title}>{data.display}</span>
            <span className = {style.price}>{ data.price ? `仅售 ￥${data.price}` : '' }</span>
        </section>
    )
}


export default App
