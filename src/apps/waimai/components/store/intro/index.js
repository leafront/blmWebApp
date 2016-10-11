import React from 'react'
import request from 'superagent'
import classnames from 'classnames'
import style from './style.css'

export default class Intro extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.storeId !== this.props.storeId) this.fetchData(nextProps.storeId)
    }
    componentDidMount() {
        this.fetchData(this.props.storeId)
    }
    fetchData(storeId) {
        request
        .get(`${HOST}/waimai/v1/restaurant?supplier=ele&restaurant_id=${storeId}`)
        .end((err, res) => {
            if (!err && res.statusCode == 200) {
                if (res.body.code != 0) return alert(res.body.message)
                this.setState(res.body.data)
            }
        })
    }
    render() {
        const { storeId, hidden } = this.props
        const { pic, name, address, serving_time, phone_list, description, rating, deliver_spent, deliver_amount, agent_fee } = this.state
        return (
            <div className = {classnames(style.intro, hidden ? 'hidden': '')}>
                <div className = {classnames(style.noBorderTop, style.wrap)}>
                    <div className = {style.row}>
                        <div className = {style.header}>
                            <div className = {style.grid1}><img src = {pic} /></div>
                            <div className = {style.grid4}>
                                <div className = {style.row}>
                                    {name}
                                </div>
                                <div className = {style.row}>
                                    <div className = {style.tr}>
                                        <span className = {style.td}><span className = {style.num}>{rating}</span> <span className = {style.item}>用户评分</span> </span>
                                        <span className = {style.td}><span className = {style.num}>{deliver_spent}</span> <span className = {style.item}>送达/分钟</span> </span>
                                        <span className = {style.td}><span className = {style.num}>{deliver_amount}</span> <span className = {style.item}>起送价/元</span> </span>
                                        <span className = {style.td}><span className = {style.num}>{agent_fee}</span> <span className = {style.item}>配送费</span> </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = {style.row}>
                        <span>{description}</span>
                    </div>
                </div>
                <div className = {style.wrap}>
                    <div className = {style.row}>
                        <span className = {style.name}>商家地址</span>{address}
                    </div>
                    <div className = {style.row}>
                        <span className = {style.name}>营业时间</span>{serving_time}
                    </div>
                    <div className = {style.row}>
                        <span className = {style.name}>商家电话</span>{phone_list}
                    </div>
                </div>
            </div>
        )
    }
}
