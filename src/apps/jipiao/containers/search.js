import React, {Component} from 'react';
import {connect} from 'react-redux';
import {searchCityReq, changeCity} from '../actions';
import {Icon, Modal} from '@boluome/blm-web-components';
import localStyle from './search.css';
import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import { browserHistory } from 'react-router';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            historyCity: [],
        }
    }

    componentWillMount() {
        const {cityList, searchCityReq} = this.props;
        if (cityList.length === 0) {
            searchCityReq();
        }
        let localStorageStart = localStorage.getItem('start'), localStorageEnd = localStorage.getItem('end');
        let historyCity = [];
        if (localStorageStart !== null) {
            localStorageStart.split(',').map((val1) => {
                localStorageEnd.split(',').map((val2) => {
                    if (historyCity.indexOf(val1) < 0 && val1 !== val2) {
                        historyCity.push(val1);
                    }
                })
            });
            this.setState({
                historyCity: historyCity
            });
        }
    }
    render() {
        const {loading, cityList} = this.props;
        return (
            <div className={localStyle.searchContent}>
                <Header title='出发城市' />
                <a className={localStyle.searchInput} onClick={() => Modal('fullScreen', <SearchInput airportList={cityList} callback={(val) => this.callbackCity(val)} />)}>
                    <Icon type='search' size={12} />
                    <span>搜索城市</span>
                </a>
                <div className={localStyle.cityModal}>
                    <p>定位</p>
                    <div>
                        <a>上海</a>
                    </div>
                </div>
                {this.state.historyCity.length !== 0 ? 
                    <div className={localStyle.cityModal}>
                        <p>历史</p>
                        <div>
                            {this.state.historyCity.map((val, idx) => <a key={idx} onClick={() => this.callbackCity(val)} >{val}</a>)}
                        </div>
                    </div> : ''}
                <div className={localStyle.cityModal}>
                    <p>城市</p>
                    <div>
                        {this.cityList()}
                    </div>
                </div>
            </div>
        )
    }
    callbackCity(val) {
        const {location, changeCity} = this.props;
        changeCity(val, location.query.state);
        browserHistory.goBack();
    }
    cityList() {
        const {cityList} = this.props;
        let newList = [];
        if (cityList.length !== 0) {
            cityList.map((val) => {
                if (newList.indexOf(val.city) < 0) {
                    newList.push(val);
                }
            });
            return (
                newList.map((val, idx) => <a key={idx} onClick={() => this.callbackCity(val)}>{val.city}</a>)
            );
        }
    }
}
const mapPropsToState = (state) => {
    return {
        loading: state.home.loading,
        cityList: state.home.cityList,
    }
};
const dispatchToProps = (dispatch) => {
    return {
        changeCity: (val, state) => dispatch(changeCity(val, state)),
        searchCityReq: () => dispatch(searchCityReq())
    }
}
export default connect(mapPropsToState, dispatchToProps)(Search);