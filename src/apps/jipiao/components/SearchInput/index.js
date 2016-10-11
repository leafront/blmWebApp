import React, {Component} from 'react';
import {Icon} from '@boluome/blm-web-components';
import localStyle from './styles.css';
export default class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchList: [],
        }
    }
    componentDidMount() {
        this.refs.input.focus();
    }
    render() {
        const {callback} = this.props;
        return (
            <div>
                <div className={localStyle.searchInput}>
                    <Icon type='search' size={12} />
                    <input type='text' ref='input' onChange={() => this.search()} />
                    <a className='modal-close'>取消</a>
                </div>
                <div className={localStyle.searchResult}>
                    {this.state.searchList.length > 0 ? this.state.searchList.map((val, idx) => <p className='modal-close' onClick={() => callback(val.city)} key={idx}>{val.city} <span>包含：{val.airport + ' '}{val.airport1 !== 'undefined' ? val.airport1 : ' '}{val.airport2 !== 'undefined' ? val.airport2 : ' '}</span></p>) : ''}
                </div>
            </div>
        )
    }
    search() {
        if (this.refs.input.value === '') {
            return this.setState({searchList: [] })
        }
        let searchList = [], inputRef = this.refs.input.value;
        let list = this.props.airportList;
        list.map((result) => {
            if (result.city.indexOf(inputRef) > -1) {
                let indexLocate = list.indexOf(result);
                if (result.city === list[indexLocate + 1].city) {
                    result.airport1 = list[indexLocate + 1].airport;
                    list.splice(indexLocate + 1, 1);
                    return searchList.push(result);
                } else if (result.city === list[indexLocate + 1].city && result.city === list[indexLocate + 2].city) {
                    result.airport1 = list[indexLocate + 1].airport;
                    result.airport2 = list[indexLocate + 2].airport;
                    list.splice(indexLocate + 1, 2);
                    return searchList.push(result);
                }
                searchList.push(result);
            }
        });
        this.setState({
            searchList: searchList
        })
    }
}
