// @ flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getSubcates, setCurrentSubcate, getGoods } from '../actions'
import SubcateList from '../components/cate/subcate_list'
import { Loading } from '@boluome/blm-web-components'

class Cate extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         data: [],
    //         cateIdx: 0,
    //         foods: [],
    //         sfoods: []
    //     }
    // }
    componentWillMount() {
        const { location, subcates, params, getSubcates } = this.props
        const { cateId } = params
        const { channel, areaId } = location.query
        document.title = '分类'
        getSubcates(channel, areaId, cateId)
    }
    componentWillReceiveProps(nextProps) {
        const { location, subcates, params, getSubcates } = this.props
        const { channel, areaId } = location.query
        const { cateId } = params
        if (nextProps.cateId && nextProps.cateId !== cateId) getSubcates(channel, areaId, nextProps.cateId)
    }
    _count(mothed, foodIdx) {
        let n = this.state.data
        const { cateIdx } = this.state
        // 先给当前分类 +- 1
        if (!n[cateIdx].count) {
            if (mothed !== 'add') return false
            n[cateIdx].count = 1
        } else {
            n[cateIdx].count = mothed === 'add' ? n[cateIdx].count + 1 : n[cateIdx].count - 1
        }
        // 再给当前菜品 +- 1
        if (!n[cateIdx].foods[foodIdx].count) {
            if (mothed !== 'add') return false
            n[cateIdx].foods[foodIdx].count = 1
        } else {
            n[cateIdx].foods[foodIdx].count = mothed === 'add' ? n[cateIdx].foods[foodIdx].count + 1 : n[cateIdx].foods[foodIdx].count - 1
        }
        this.setState({ data: n })
    }
    render() {
        const { getGoods, onSelectFood, current, setCurrentSubcate, subcates, num, total, onLogin, onConfirm, location } = this.props
        const { channel, areaId } = location.query
        return (
            <SubcateList subcates = {subcates} current = {current}
             onSelectGoods = {(a, b, c, d) => _selectGoods(a, b, c, d)}
             onSelectSubcate = {
                 (idx, idList) => {
                     setCurrentSubcate(idx)
                     getGoods(channel, areaId, idList)
                 }
             } />
        )
    }
}

function mapStateToProps(state) {
    return {
        subcates: state.cate.subcates,
        current: state.cate.current
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getSubcates: (channel, areaId, cateId) => dispatch(getSubcates(channel, areaId, cateId)),
        setCurrentSubcate: idx => dispatch(setCurrentSubcate(idx)),
        getGoods: (channel, areaId, subcateId) => dispatch(getGoods(channel, areaId, subcateId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cate)
