import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

const Routes = (
    <Router history={ browserHistory }>
        <Route path='dianying' component={ require('react-router?name=dianying!./apps/dianying') }>
            <IndexRoute component={ require('react-router?name=dianying.home!./apps/dianying/containers/home') } />
            <Route path='movies/:filmId' component={ require('react-router?name=dianying.detail!./apps/dianying/containers/detail') } />
            <Route path='cinemas' component={ require('react-router?name=dianying.cinemas!./apps/dianying/containers/cinemas') } />
            <Route path='cinemas/:cinemaId' component={ require('react-router?name=dianying.cinema!./apps/dianying/containers/cinema') } />
            <Route path=':filmId/cinemas' component={ require('react-router?name=dianying.cinemas!./apps/dianying/containers/cinemas') } />
            <Route path=':filmId/cinemas/:cinemaId' component={ require('react-router?name=dianying.cinema!./apps/dianying/containers/cinema') } />
            <Route path='seat' component={ require('react-router?name=dianying.seat!./apps/dianying/containers/seat') } />
            <Route path='confirm' component={ require('react-router?name=dianying.confirm!./apps/dianying/containers/confirm') } />
        </Route>
        <Route path='huafei' component={ require('react-router?name=huafei!./apps/huafei') } />
        <Route path='liuliang' component={ require('react-router?name=liuliang!./apps/liuliang') } />
        <Route path='cashier/:orderId' component={ require('react-router?name=cashier!./apps/cashier') } />
        <Route path='shengxian' component={ require('react-router?name=shengxian!./apps/shengxian') }>
            <IndexRoute component={ require('react-router?name=shengxian.home!./apps/shengxian/containers/home') } />
            <Route path='cates/:cateId' component={ require('react-router?name=shengxian.cate!./apps/shengxian/containers/cate') } />
            <Route path='cart' component={ require('react-router?name=shengxian.cart!./apps/shengxian/containers/cart') } />
            <Route path='confirm' component={ require('react-router?name=shengxian.confirm!./apps/shengxian/containers/confirm') } />
            <Route path='goods/:goodsId' component={ require('react-router?name=shengxian.detail!./apps/shengxian/containers/detail') } />
        </Route>
        <Route path='waimai' component={ require('react-router?name=waimai!./apps/waimai') }>
            <IndexRoute component={ require('react-router?name=waimai.home!./apps/waimai/containers/home') } />
            <Route path='restaurants/:storeId' component={ require('react-router?name=waimai.store!./apps/waimai/containers/store') } />
            <Route path='cart' component={ require('react-router?name=waimai.cart!./apps/waimai/containers/cart') } />
            <Route path='confirm' component={ require('react-router?name=waimai.confirm!./apps/waimai/containers/confirm') } />
        </Route>
        <Route path='zhuanche' component={require('react-router?name=zhuanche!./apps/zhuanche')}>
            <IndexRoute component={ require('react-router?name=zhuanche.home!./apps/zhuanche/containers/home') } />
            <Route path='order/:orderId' component={require('react-router?name=zhuanche.order!./apps/zhuanche/containers/order')} />
            <Route path='pay' component={require('react-router?name=zhuanche.pay!./apps/zhuanche/containers/pay')} />
        </Route>
        <Route path='jipiao' component={require('react-router?name=jipiao!./apps/jipiao')}>
            <IndexRoute component={ require('react-router?name=jipiao.home!./apps/jipiao/containers/home') } />
            <Route path='search' component={require('react-router?name=jipiao.search!./apps/jipiao/containers/search')} />
            <Route path='scheduleList' component={require('react-router?name=jipiao.scheduleList!./apps/jipiao/containers/scheduleList')} />
            <Route path='airportDetail' component={require('react-router?name=jipiao.airportDetail!./apps/jipiao/containers/airportDetail')} />
            <Route path='order' component={require('react-router?name=jipiao.order!./apps/jipiao/containers/order')} />
            <Route path='addMember' component={require('react-router?name=jipiao.addMember!./apps/jipiao/containers/addMember')} />
            <Route path='memberForm' component={require('react-router?name=jipiao.memberForm!./apps/jipiao/containers/memberForm')} />
        </Route>
        <Route path='hotel' component={ require('react-router?name=hotel!./apps/hotel') }>
            <IndexRoute component={ require('react-router?name=hotel.home!./apps/hotel/containers/home') } />
            <Route path='search' component={ require('react-router?name=hotel.search!./apps/hotel/containers/search') } />
            <Route path='list' component={ require('react-router?name=hotel.list!./apps/hotel/containers/list') } />
            <Route path='detail/:hotelId' component={ require('react-router?name=hotel.detail!./apps/hotel/containers/detail') } />
            <Route path='photoList/:hotelId' component={ require('react-router?name=hotel.photoList!./apps/hotel/containers/photoList') } />
            <Route path='introduce/:hotelId' component={ require('react-router?name=hotel.introduce!./apps/hotel/containers/introduce') } />
            <Route path='order' component={ require('react-router?name=hotel.order!./apps/hotel/containers/order') } />
            <Route path='suretyOrder' component={ require('react-router?name=hotel.order!./apps/hotel/containers/suretyOrder') } />
        </Route>
    </Router>
)

export default Routes
