// @flow
import { Calendar , Modal } from '@boluome/blm-web-components'
import React, {Component} from 'react'
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
class CalendarTime extends React.Component {
    constructor(props) {
        super(props);
        let nowDate = new Date();
        let week = getDay(nowDate);
        this.state = {
            year: nowDate.getFullYear(),
            month: nowDate.getMonth(),
            day: nowDate.getDate(),
            week: week
        }
    }
    render() {
         const hotelInfo = JSON.parse(localStorage.getItem('HOTEL_INFO')) || {}
         const month = (this.state.month+1)<10?"0"+(this.state.month+1):this.state.month+1
         const d = new Date()
         const hours = d.getHours()
         const minutes = d.getMinutes()
         const year = this.state.year
         const day = this.state.day<10?"0"+this.state.day:this.state.day
         hotelInfo.startTime = year + '-' + month + '-' + day
         hotelInfo.startDate = year + '-' + month + '-' + day + ' 00:00'
         hotelInfo.startHours = hours +':'+minutes
         localStorage.setItem('HOTEL_INFO',JSON.stringify(hotelInfo))
        return (
          <time onClick={() => Modal('fullScreen',
            <Calendar year={this.state.year}
            month={month}
            day={this.state.day}
            callback={(year, month, day, week) => this.chose(year, month, day, week)} />)
          }>
          {year + '年' + month + '月' + day + '日' + this.state.week}
          </time>
        )
    }
    chose (year, month, day, week,date) {
        this.setState({
            year, month, day, week,date
        });
    }
}

export default CalendarTime
