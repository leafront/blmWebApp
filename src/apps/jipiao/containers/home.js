// @ flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tabbar} from '@boluome/blm-web-components';
import {changeChannelTab} from '../actions';
import localStyle from './home.css';
import Content from './content';

const App = (props) => {
    const {channelCurrent, changeChannelTab} = props;
    const channelTabs: Array<string> = ['真旅'];
    const channelContents: Array<Object> = [<Content id={0} />]
    return (
        <div className={localStyle.wrapper}>
            <h4 className={localStyle.title}>飞机票</h4>
            <div className={localStyle.tabbar}>
                <Tabbar type = 'channel' tabs = {channelTabs} contents = {channelContents} current = {channelCurrent} onTabClick = {(idx) => changeChannelTab(idx)} />
            </div>
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