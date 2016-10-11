import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeCity, getDate, searchCityReq, getAirportSchedule} from '../actions';
import {Modal, Icon, Calendar} from '@boluome/blm-web-components';
import { browserHistory } from 'react-router';
import localStyle from './content.css';

class Content extends React.Component {
    constructor(props) {
        super(props);
        // localStorage.clear();
    }
    componentWillMount() {
        const {searchCityReq, cityList} = this.props;
        if (cityList.length > 0) {
            return;
        }
        searchCityReq();
    }
    render() {
        const {startCity, endCity, year, month, day, week} = this.props;
        return (
            <div>
                <div className={localStyle.placeWarpper}>
                    <div className={localStyle.locate}>
                        <p>出发地</p>
                        <p onClick={() => browserHistory.push(`/jipiao/search?state=start`)} ref='start'>{startCity.city}</p>
                    </div>
                    <div className={localStyle.change}>
                        <a onClick={() => this.changeLocate()}>
                            <Icon type='swap_horiz' />
                        </a>
                    </div>
                    <div className={localStyle.locate}>
                        <p>目的地</p>
                        <p onClick={() => browserHistory.push(`/jipiao/search?state=end`)} ref='end'>{endCity.city}</p>
                    </div>
                </div>
                <div className={localStyle.startTime}>
                    <p>出发日期</p>
                    <a onClick={() => Modal('fullScreen', <Calendar year={year} month={month} day={day} callback={(year, month, day, week) => this.chose(year, month, day, week)} />)}>{year + ' 年 ' + (month + 1) + ' 月 ' + day + ' 日 ' + week}</a>
                </div>
                <a className={localStyle.searchBtn} onClick={() => this.searchAirTickets()}>查询机票</a>
                {this.history()}
            </div>
        )
    }
    chose (year, month, day, week) {
        const {getDate} = this.props;
        getDate(year, month, day, week);
    }
    changeLocate () {
        const {changeCity, cityList} = this.props;
        let startInfo, endInfo;
        let startCityArray = [], endCityArray = [];
        startInfo = this.refs.start.innerText;
        endInfo = this.refs.end.innerText;
        cityList.map((val) => {
            if (val.city === startInfo) {
                startCityArray.push(val);
            } else if (val.city === endInfo) {
                endCityArray.push(val);
            }
        });
        changeCity(endCityArray[0], 'start');
        changeCity(startCityArray[0], 'end');
    }
    searchAirTickets() {
        const {startCity, endCity, year, month, day, week, cityList} = this.props;
        let start = this.refs.start.innerText, 
            end = this.refs.end.innerText;
        let startArray = localStorage.getItem('start'),
            endArray = localStorage.getItem('end');
        let startNewArray = [], endNewArray = [];
        if (startArray === null && endArray === null) {
            startNewArray.push(start);
            endNewArray.push(end);
        } else if (startArray.split(',').indexOf(start) < 0) {
            if (startArray.split(',').length >= 5) {
                let a = startArray.split(',');
                let b = endArray.split(',');
                a.pop();
                b.pop();
                startNewArray.push(start, a);
                endNewArray.push(end, b);
            }  else {
                startNewArray.push(start, startArray);
                endNewArray.push(end, endArray);
            }
        } else if (startArray.split(',').indexOf(start) > -1) {
            let endLocate = startArray.split(',').indexOf(start);
            if (endArray.split(',')[endLocate] !== end) {
                if (startArray.split(',').length >= 5) {
                    let a = startArray.split(',');
                    let b = endArray.split(',');
                    a.pop();
                    b.pop();
                    startNewArray.push(start, a);
                    endNewArray.push(end, b);
                }  else {
                    startNewArray.push(start, startArray);
                    endNewArray.push(end, endArray);
                }
            } else {
                let a = startArray.split(',');
                let b = endArray.split(',');
                a.splice(endLocate, 1);
                b.splice(endLocate, 1);
                startNewArray.push(start, a);
                endNewArray.push(end, b);
            }
        } else {
            startNewArray.push(startArray);
            endNewArray.push(endArray);
        }
        localStorage.setItem('start', startNewArray);
        localStorage.setItem('end', endNewArray);

        let fromDate = year + '-' + (month > 8 ? month + 1 : '0' + (month + 1)) + '-' + (day > 9 ? day : '0' + day);
        if (startCity.code !== undefined && endCity.code !== undefined) {
            localStorage.setItem('startCity', JSON.stringify(startCity));
            localStorage.setItem('endCity', JSON.stringify(endCity));
        } else {
            let startCityArray = [], endCityArray = [];
            cityList.map((val) => {
                if (val.city === startCity.city) {
                    startCityArray.push(val);
                } else if (val.city === endCity.city) {
                    endCityArray.push(val);
                }
            });
            localStorage.setItem('startCity', JSON.stringify(startCityArray[0]));
            localStorage.setItem('endCity', JSON.stringify(endCityArray[0]));
        }
        localStorage.setItem('date', JSON.stringify(fromDate));
        browserHistory.push(`/jipiao/scheduleList`);
    }
    history() {
        let historyStart = localStorage.getItem('start'), historyEnd = localStorage.getItem('end');
        if (historyStart !== null || historyEnd !== null ) {
            return (
                <div className={localStyle.history}>
                    <p>历史纪录</p>
                    <div>
                    {historyStart.split(',').map((val, idx) => <a key={idx}>{val} - {historyEnd.split(',')[idx]}</a>)}
                    </div>
                    <a onClick={() => {localStorage.clear(); this.forceUpdate();}}>清除全部</a>
                </div>
            )
        }
    }
}
const mapPropsToState = (state) => {
    return {
        startCity: state.home.startCity,
        endCity: state.home.endCity,
        year: state.home.year,
        month: state.home.month,
        day: state.home.day,
        week: state.home.week,
        cityList: state.home.cityList,
    }
};
const dispatchToProps = (dispatch) => {
    return {
        getDate: (y, m, d, w) => dispatch(getDate(y, m, d, w)),
        changeCity: (val, state) => dispatch(changeCity(val, state)),
        searchCityReq: () => dispatch(searchCityReq()),
    }
}
export default connect(mapPropsToState, dispatchToProps)(Content);