import React, {Component} from 'react';
import localStyle from './styles.css';
import classnames from 'classnames';
import {Modal, Icon} from '@boluome/blm-web-components';
export class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchList: []
        }
    }
    componentDidMount() {
        this.refs.input.focus();
    }
    render() {
        return (
            <div className={localStyle.searchDiv}>
                <a className={'modal-close'}><Icon type='arrow_back' /> </a>
                <input className={localStyle.searchInput} ref="input" type = 'text' onChange = {(c) => {this.search(c.target.value)}} placeholder='搜索位置...' />
                <div className={localStyle.scrollDiv}>
                    {this.state.searchList.map((result, idx) => <p className='modal-close' key={idx} onClick={() => this.props.callback(result)}>{result.title}<br /><span className='modal-close'>{result.address}</span></p>)}
                </div>
            </div>
        )
    }
    search(c) {
        let t = this;
        if (c === '' || c.length < 0) {
            return this.setState({searchList: []});
        }
        let options = {
            onSearchComplete: function(results){
                // 判断状态是否正确
                if (local.getStatus() == BMAP_STATUS_SUCCESS){
                    var s = [], l = [];
                    for (var i = 0; i < results.getCurrentNumPois(); i ++){
                        s.push(results.getPoi(i));
                    }
                    t.setState({
                        searchList: s
                    });
                }
            }
        };
        var local = new $config.BMap.LocalSearch(this.props.city, options);
        local.search(c);
    }
}