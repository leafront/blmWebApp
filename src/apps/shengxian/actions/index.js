// @flow
import libs from 'libs'
import request from 'superagent'

export const getCates = (channel, areaId) => dispatch => {
    request.get(`${window.$config.HOST}/shengxian/v1/commodity/categories?channel=${channel}&areaId=${areaId}`).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return alert(JSON.stringify(res.body.message))
            dispatch(getCatesReturn(res.body.data))
        }
    })
}

const getCatesReturn = cates => {
    return {
        type: 'GET_CATE', cates
    }
}

export const setCity = areaId => {
    return {
        type: 'SET_CITY', areaId
    }
}

export const getSubcates = (channel, areaId, cateId) => dispatch => {
    request.get(`${window.$config.HOST}/shengxian/v1/commodity/subcategories?channel=${channel}&areaId=${areaId}&categoryId=${cateId}`).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return alert(JSON.stringify(res.body.message))
            dispatch(getSubcatesReturn(res.body.data))
        }
    })
}

const getSubcatesReturn = subcates => {
    return {
        type: 'GET_SUBCATES_RETURN', subcates
    }
}

export const setCurrentSubcate = idx => {
    return {
        type: 'SET_CURRENT_SUBCATE', idx
    }
}

export const _selectGoods = (id, name, price, mothed) => {
    // let n = this.state.sfoods
    // const idx = _.findIndex(n, {id: id})
    // if (idx === -1) {
    //     if (mothed !== 'add') return false
    //     n.push({id: id, name: name, price: price, quantity: 1})
    // } else {
    //     n[idx].quantity = mothed === 'add' ? n[idx].quantity + 1 : n[idx].quantity - 1 === 0 ? delete n[idx] : n[idx].quantity - 1
    // }
    // this.setState({ sfoods: n, num : mothed === 'add' ? this.state.num + 1 : this.state.num - 1, total: mothed === 'add' ? this.state.total + price: this.state.total - price })
}

export const getGoods = (channel, areaId, subcateId) => dispatch => {
    request.post(`${window.$config.HOST}/shengxian/v1/commodities`, {
        channel: channel,
        areaId: areaId,
        categoryIdList: subcateId
    }).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return alert(JSON.stringify(res.body.message))
            dispatch(getGoodsReturn(res.body.data))
        }
    })
}

const getGoodsReturn = (goods) => {
    return {
        type: 'GET_GOODS_RETURN', goods
    }
}


export const getDetail = (channel, areaId, goodsCode) => dispatch => {
    request.get(`${window.$config.HOST}/shengxian/v1/commodity?channel=${channel}&areaId=${areaId}&commodityCode=${goodsCode}`).end((err, res) => {
        if (!err && res.statusCode === 200) {
            if (res.body.code !== 0) return alert(JSON.stringify(res.body.message))
            dispatch(getDetailReturn(res.body.data))
        }
    })
}

const getDetailReturn = (detail) => {
    return {
        type: 'GET_DETAIL', detail
    }
}
