// @ flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getDetail } from '../actions'
import Main from '../components/detail/main'
import Footer from '../components/detail/footer'

class Detail extends Component {
    componentWillMount() {
        const { info, params, location, getDetail } = this.props
        const {goodsId} = params
        const {channel, areaId} = location.query
        if (!info.commodityId) getDetail(channel, areaId, goodsId)
    }
    componentWillReceiveProps(nextProps) {
        const { info, params, location, getDetail } = this.props
        const {goodsId} = params
        const {channel, areaId} = location.query
        if (nextProps.info.commodityCode && nextProps.info.commodityCode !== goodsId) getDetail(channel, areaId, nextProps.info.commodityId)
    }
    render() {
        const { info, params, location } = this.props
        console.log(info)
        return (
            <div>
                <Main info = { info } />
                <Footer total = {12.2} confirmOrder = {() => console.log(111)} />
            </div>
        )
    }
}

Detail.propTypes = {
    info: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        info: state.detail.info
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getDetail: (arg1, arg2, arg3) => dispatch(getDetail(arg1, arg2, arg3))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
