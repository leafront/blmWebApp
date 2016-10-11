import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAirportSchedule, getDate, changeScheduleList} from '../actions';
import {Modal, Icon, Calendar} from '@boluome/blm-web-components';
import localStyle from './scheduleList.css';
import Header from '../components/Header';
import { browserHistory } from 'react-router';
import Filter from '../components/Filter';
const getDay = (val) => {
        switch(val.getDay()) {
        case 0:
            return '周日';
        case 1: 
            return '周一';
        case 2: 
            return '周二';
        case 3: 
            return '周三';
        case 4: 
            return '周四';
        case 5: 
            return '周五';
        case 6: 
            return '周六';
        };
    }
class ScheduleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prevCanClick: true,
            nextCanClick: true,
            filter: false
        }
        this.localStartCity = JSON.parse(localStorage.getItem('startCity'));
        this.localEndCity = JSON.parse(localStorage.getItem('endCity'));
        this.date = JSON.parse(localStorage.getItem('date'));
        let useDate = new Date(), localDate = this.date.split('-');
        if (props.year !== localDate[0] || props.month !== localDate[1] || props.day !== localDate[2]) {
            useDate.setFullYear(this.date.split('-')[0]);
            useDate.setMonth(this.date.split('-')[1] - 1);
            useDate.setDate(this.date.split('-')[2]);
            props.getDate(useDate.getFullYear(), useDate.getMonth(), useDate.getDate(), getDay(useDate));
        }
    }
    componentWillMount() {
        if (this.localStartCity !== undefined && this.localEndCity !== undefined && this.date !== undefined) {
            this.getPostReq(this.localStartCity, this.localEndCity, this.date);
        } else {
            browserHistory.replace('/jipiao');
        }
    }
    componentWillReceiveProps(nextProps) {
        const {year, month, day} = this.props;
        if (nextProps.day !== this.state.day) {
            let nowDate = new Date();
            let next60Date = new Date(nowDate.getTime() + 53*24*60*60*1000);
            if (year === nowDate.getFullYear() && month === nowDate.getMonth() && day === nowDate.getDate() ) {
                this.setState({
                    prevCanClick: false,
                    nextCanClick: true,
                })
            } else if (year === next60Date.getFullYear() && month === next60Date.getMonth() && day === next60Date.getDate()) {
                this.setState({
                    prevCanClick: true,
                    nextCanClick: false,
                });
            } else {
                this.setState({
                    prevCanClick: true,
                    nextCanClick: true,
                });
            }
        }
    }
    componentWillUnmount() {
        const {changeScheduleList} = this.props;
        changeScheduleList();
    }
    render() {
        const {loading, scheduleList, year, month, day, week, scheduleListLocal} = this.props;
        return (
            <div className={localStyle.searchContent}>
                <Header title={this.localStartCity.city + ' - ' + this.localEndCity.city} />
                <div className={localStyle.navBar}>
                    <a className={!this.state.prevCanClick ? localStyle.canClick : ''} onClick={() => this.state.prevCanClick ? this.otherDays(year, month, day, 'prev') : ''}>前一天</a>
                    <a className={localStyle.choseTime} onClick={() => Modal('fullScreen', <Calendar year={year} month={month} day={day} callback={(year, month, day, week) => this.chose(year, month, day, week)} />)}>{year + ' 年 ' + (month + 1) + ' 月 ' + day + ' 日 ' + week}</a>
                    <a className={!this.state.nextCanClick ? localStyle.canClick : ''} onClick={() => this.state.nextCanClick ? this.otherDays(year, month, day, 'next') : ''}>后一天</a>
                </div>
                <div className={localStyle.scheduleList}>
                    {scheduleList.length !== 0 ? (scheduleListLocal || scheduleList.flightObject).map((val, idx) => {
                        return (
                            <div className={localStyle.scheduleContent} key={idx} onClick={() => this.nextPage(val)}>
                                <div>
                                    <p className={localStyle.scheduleListLeft}>{val.fromDate.slice(11)}</p>
                                    <Icon type='flight_takeoff' />
                                    <p className={localStyle.scheduleListMiddle}>
                                        {val.toDate.slice(11)}
                                        <span>{val.crossDay ? '+1' : ''}</span>
                                    </p>
                                    <p className={localStyle.scheduleListRight}>&yen;{val.cabinInfo[0].facePrice}</p>
                                </div>
                                <div>
                                    <p className={localStyle.scheduleListLeft}>{val.fromAirportName + (val.fromTower !== undefined ? val.fromTower : '')}</p>
                                    <p className={localStyle.scheduleListMiddle}>{val.toAirportName + (val.toTower !== undefined ? val.toTower : '')}</p>
                                    <p className={localStyle.scheduleListRight}>{val.cabinInfo[0].discount >= 100 ? '无折扣' : val.cabinInfo[0].discount.toString().slice(0, 1) + '折'}</p>
                                </div>
                                <div>
                                    <p className={localStyle.scheduleListLeft}>{val.airline + val.flightNo + ' | ' + val.planeModel + (val.shareFlightNo ? '(共享航班)' : '')}</p>
                                    <p className={localStyle.scheduleListRight}>仅剩{val.totalRestSeatNumber}张</p>
                                </div>
                            </div>
                        )
                    }) : ''}
                </div>
                <div className={localStyle.airportSelect}>
                    <a onClick={() => this.setState({filter: !this.state.filter})}><Icon type='filter_list' />筛选</a>
                    <a onClick= {() => this.selectTime()}><Icon type='access_time' />时间</a>
                    <a onClick={() => this.selectPrice()}><Icon type='attach_money' />票价</a>
                </div>
                {loading ? <div style={{position: 'fixed', top: '48px', left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)',alignItems: 'center', justifyContent: 'center', color: 'white', display: 'flex'}}>loading...</div> : ''}
                <Filter filter={this.state.filter} scheduleList={scheduleList} airlineList='airlineList' fromAirportList='fromAirportList' toAirportList='toAirportList' cancel={(val) => this.setState({filter: val})} callBack={(obj) => this.filterList(obj)} />
            </div>
        )
    }
    chose (year, month, day, week) {
        const {getDate} = this.props;
        getDate(year, month, day, week);
        let fromDate = year + '-' + (month > 8 ? month + 1 : '0' + (month + 1)) + '-' + (day > 9 ? day : '0' + day);
        localStorage.setItem('date', JSON.stringify(fromDate));
        this.getPostReq(this.localStartCity, this.localEndCity, fromDate);
    }
    otherDays(year, month, day, type) {
        const {getDate} = this.props;
        let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
            daysInMonth[1] = 29;
        }
        switch(type) {
            case 'prev':
                --day;
                if (day === 0) {
                    --month;
                    day = daysInMonth[month];
                    if (month < 0) {
                        --year;
                        month = 11;
                        day = 31;
                    }
                }
                break;
            case 'next':
                ++day;
                if (day === daysInMonth[month]) {
                    ++month;
                    day = 1;
                    if (month > 11) {
                        ++year;
                        month = 0;
                        day = 1;
                    }
                }
                break;
        }

        let d = new Date();
        d.setFullYear(year);
        d.setMonth(month);
        d.setDate(day);
        getDate(year, month, day, getDay(d));
        let fromDate = year + '-' + (month > 8 ? month + 1 : '0' + (month + 1)) + '-' + (day > 9 ? day : '0' + day);
        localStorage.setItem('date', JSON.stringify(fromDate));
        this.getPostReq(this.localStartCity, this.localEndCity, fromDate);
    }
    getPostReq(start, end, date) {
        const {getAirportSchedule} = this.props;
        getAirportSchedule(start, end, date);
    }
    filterList(obj) {
        const {scheduleList, changeScheduleList} = this.props;
        let scheduleListFlightObject = [];
        const airlineList = (ele) => {
            if (obj.airlineList.length === 0) {
                return ele;
            }
            return obj.airlineList.indexOf(ele.airline) > -1 ? ele : ''
        }
        const time = (ele) => {
            if (obj.time.length === 0) {
                return ele;
            }
            // let date = ele.fromDate.slice(11), bol, a = [];

                //hangban
                let bol = false;
                let date = ele.fromDate.slice(11);
                obj.time.forEach(time => {
                   //shijian tiaojian
                   switch (time) {
                        case '00:00-06:00':
                            if('00:00' < date && date < '06:00') {
                                return bol = true
                            } ;
                        case '06:00-12:00':
                            if('06:00' < date && date < '12:00') {
                                return bol = true;
                            };
                        case '12:00-18:00':
                            if('12:00' < date && date < '18:00') {
                                return bol = true;
                            }
                        case '18:00-24:00':
                            if('18:00' < date && date < '24:00') {
                                return bol = true;
                            }
                    }
                })
                return bol;
            // obj.time.filter(val => {switch (val) {
            //         case '00:00-06:00':
            //             return '00:00' < date && date < '06:00';
            //         case '06:00-12:00':
            //             return '06:00' < date && date < '12:00';
            //         case '12:00-18:00':
            //             return '12:00' < date && date < '18:00';
            //         case '18:00-24:00':
            //             return '18:00' < date && date < '24:00';
            //     }})
            // obj.time.map((val) => {
                
            //     bol ? a.push(ele) : '';
            // });
            // return a;
        }
        const fromAirportList = (ele) => {
            if (obj.fromAirportList.length === 0) {
                return ele;
            }
            return obj.fromAirportList.indexOf(ele.fromAirportName) > -1;
        }
        const toAirportList = (ele) => {
            if (obj.toAirportList.length === 0) {
                return ele;
            }
            return obj.toAirportList.indexOf(ele.toAirportName) > -1;
        }
        if (scheduleList !== undefined) {
            if (obj.airlineList.length === 0 && obj.time.length === 0 && obj.fromAirportList.length === 0 && obj.toAirportList.length === 0) {
                return changeScheduleList(scheduleList.flightObject);
            }
            let w1, w2, w3, w4;
            w1 = scheduleList.flightObject.filter(airlineList);
            w2 = w1.filter(time);
            w3 = w2.filter(fromAirportList);
            w4 = w3.filter(toAirportList);
            return changeScheduleList(w4);
        }
    }
    nextPage(val) {
        localStorage.setItem('detail', JSON.stringify(val));
        browserHistory.push(`/jipiao/airportDetail`);
    }
}
const mapPropsToState = (state) => {
    return {
        loading: state.home.loading,
        cityList: state.home.cityList,
        scheduleList: state.home.scheduleList,
        year: state.home.year,
        month: state.home.month,
        day: state.home.day,
        week: state.home.week,
        scheduleListLocal: state.home.scheduleListLocal
    }
};
const dispatchToProps = (dispatch) => {
    return {
        getAirportSchedule: (fromCity, toCity, formDate) => dispatch(getAirportSchedule(fromCity, toCity, formDate)),
        getDate: (y, m, d, w) => dispatch(getDate(y, m, d, w)),
        changeScheduleList: (data) => dispatch(changeScheduleList(data)),
    }
}
export default connect(mapPropsToState, dispatchToProps)(ScheduleList);