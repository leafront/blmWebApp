// @flow
import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { moment }  from 'libs/utils'
import { getSeatData, addSeatToList, deleteSeatFromList, deleteAllSeatFromList, saveConfirmParams, clearState } from '../actions'
import { Toast } from '@boluome/blm-web-components'
import Seats from '../components/seat/seats'
import Header from '../components/seat/header'
import Footer from '../components/seat/footer'

class Seat extends Component {
    componentWillMount() {
        document.title = '选择座位'
        const { data, location, getSeatData, deleteAllSeatFromList } = this.props
        const { channel, showId, cinemaId, hallId, date } = location.query
        if(!checkDateIsCurrent(date)) {
          Toast('error', `您选择的是${ new moment(date).format('MM月DD日') }的场次， 请看仔细哦`)
        }
        deleteAllSeatFromList()
        getSeatData(channel, showId, cinemaId, hallId)
    }
    componentWillUnmount() {
        this.props.clearState('SEAT')
    }
    render() {
        const { seats, location, addSeatToList, selected, deleteSeatFromList, saveConfirmParams } = this.props
        const { filmName, hallName, date, time, type, price, channel, filmId, cinemaId, cinemaName, showId } = location.query
        const params = {
            channel,
            seatNo: selected,
            filmId,
            cinemaId,
            showId,
            showDate: date,
            count: selected.length,
            moviePhoto: '',
            total: price * 100 * selected.length / 100,
            userId: 'blm001',
            customerId: 'datong',
            customerUserId: 'datong001'
        }
        return (
            <div>
                <Header filmName = {filmName} cinemaName={cinemaName} date = {date} time = {time} type = {type} />
                <Seats data = {seats} hallName = {hallName} selected = {selected}
                    addSeatToList = { (seat) => addSeatToList(seat) } deleteSeatFromList = { (seat) => deleteSeatFromList(seat) } />
                <Footer selected = {selected} total = {price * 100 * selected.length / 100} saveConfirmParams = {() => {
                        saveConfirmParams(params, seats, `/dianying/confirm?filmName=${filmName}&date=${date}&time=${time}&type=${type}`)
                    }} />
            </div>
        )
    }
}
const checkDateIsCurrent = date => new moment().format('YYYY-MM-DD') == new moment(date).format('YYYY-MM-DD')

Seat.propTypes = {
    seats: PropTypes.array.isRequired
}

function mapStateToProps(state) {
    let selectedSeat = JSON.parse(localStorage.selectedSeat || '[]')
    return {
        seats: state.seat.seats,
        selected: selectedSeat.length ? selectedSeat : state.seat.selected
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getSeatData: (arg1, arg2, arg3, arg4) => dispatch(getSeatData(arg1, arg2, arg3, arg4)),
        addSeatToList: (seat) => dispatch(addSeatToList(seat)),
        deleteSeatFromList: (seat) => dispatch(deleteSeatFromList(seat)),
        deleteAllSeatFromList: () => dispatch(deleteAllSeatFromList()),
        saveConfirmParams: (params, seats, successUrl) => {
          let { seatNo } = params
          console.log(checkSeatIsValid(seats, seatNo))
          // if(checkSeatIsValid(seats, seatNo)) {
          //   Toast('error', '不能空一个座位');
          // } else {
          //   // dispatch(saveConfirmParams(params))
          //   // browserHistory.push(successUrl)
          // }
        },
        clearState: (page) => dispatch(clearState(page))
    }
}

const checkSeatIsValid = (seats, selectedSeat) => {

   //复制座位列表
   let cloneSeats = JSON.parse(JSON.stringify(seats))
   let hasStep    = false

   //将当前选中的座位赋值到列表中
   cloneSeats.forEach((row, rowIdx) => row.forEach(col => {
     selectedSeat.forEach((seat, idx) => {
       if(seat.seatRow == col.seatRow && seat.seatCol == col.seatCol) {
         seat.rowIdx  = rowIdx
         col.selected = true
       }
     })
   }))
   //遍历已选座位并判断是否有间隔
   selectedSeat.forEach(seat => {
     let rowData = cloneSeats[seat.rowIdx]
     //console.log(rowData)
     let currentIdx = 0
     rowData.forEach((o, idx) => { if(o.seatCol == seat.seatCol) currentIdx = idx })
     //判断座位是否被选中
     const checkSeat = seat => !!seat && (seat.selected || seat.status == 1)
     //判断相对座位是否有间隔
     const checkStep = (cur, rel) => Math.abs(cur.seatCol - rel.seatCol) == 2
     //判断相邻座位是否有间隔
     const checkHasStep = (near1, near2) => (!!near1 && near1.id != -1) && !checkSeat(near1) &&
                                            ((checkSeat(near2) && checkStep(seat, near2)) || ((!!near2 && near2.id == -1) || !near2))

     if(!hasStep) {
       hasStep = checkHasStep(rowData[currentIdx + 1], rowData[currentIdx + 2]) ||
                 checkHasStep(rowData[currentIdx - 1], rowData[currentIdx - 2])
     }
   })

   return hasStep
}


export default connect(mapStateToProps, mapDispatchToProps)(Seat)
