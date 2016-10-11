// @ flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tabbar} from '@boluome/blm-web-components';
import {changeChannelTab} from '../actions';
import Content from './content';
import yidao from '../../../images/yidao.jpg'
//'滴滴出行', <Content id={0} />, 
const App = (props) => {
    const {channelCurrent, changeChannelTab} = props;
    const channelTabs: Array<Object> = [{type: '易到专车', icon: yidao, discount: '6折'}];
    const channelContents: Array<Object> = [<Content id={1} />]
    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <h4 style={{display: 'flex', justifyContent: 'center', margin: 10}}>专车</h4>
            <Tabbar type = 'channel' tabs = {channelTabs} contents = {channelContents} current = {channelCurrent} onTabClick = {(idx) => changeChannelTab(idx)} />
        </div>
    )
}
const mapPropsToState = (state) => {
    return {
        channelCurrent: state.home.channelCurrent
    }
};
const dispatchToProps = (dispatch) => {
    return {
        changeChannelTab: (idx) => dispatch(changeChannelTab(idx))
    }
}
export default connect(mapPropsToState, dispatchToProps)(App);