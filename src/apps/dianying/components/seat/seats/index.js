// @flow
import React, { Component } from 'react'
// import { browserHistory } from 'react-router'
import localStyle from './style.css'
import classnames from 'classnames'
import { Toast } from '@boluome/blm-web-components'
import imgUnselectable from '../../../images/unselectable.png'
import imgBlank from '../../../images/blank.png'
import imgSelected from '../../../images/selected.png'

const Seats = ({data, hallName, addSeatToList, selected, deleteSeatFromList}) => {
    let rowNodes = []
    let rowNum = 1
    return (
        <div className = { localStyle.seats }>
            <div className = { localStyle.hall }>{hallName}</div>
            <div className = { localStyle.seatsZone }
                 onScroll={({ target }) => {
                    let scrollLeft = target.scrollLeft
                    let rowNums    = target.getElementsByClassName(localStyle.rowNum)
                    for(let i = 0; i< rowNums.length; i++) {
                      rowNums[i].style.left = `${ scrollLeft }px`
                    }
                 }}>
              {
                data && data.length > 0 &&
                  data.map((row, idx) =>(<Row key = { `seat-row-${ idx }` } idx = { row.filter(o => typeof o.id == 'string').length == 0 ? 0 : rowNum++ } data = { row } colMax = { data.colMax } selected = {selected}
                     addSeatToList = {(seat) => addSeatToList(seat)} deleteSeatFromList = { (seat) => deleteSeatFromList(seat) } />
                  )) || ''
              }
            </div>
            <div className = { localStyle.eg }>
                <section className = { localStyle.item }><img className = {localStyle.img} src = {imgSelected} /><span> 已选</span></section>
                <section className = { localStyle.item }><img className = {localStyle.img} src = {imgUnselectable} /><span> 已售</span></section>
                <section className = { localStyle.item }><img className = {localStyle.img} src = {imgBlank} /><span> 可选</span></section>
            </div>
        </div>
    )
}

const Row = ({idx, data, colMax, addSeatToList, selected, deleteSeatFromList}) => {
    let colArr = []
    for (let i = 0; i < colMax - 1; i++) {
        colArr[i] = i + 1
    }
    return (
        <div className = { localStyle.row } >
            <span className = { localStyle.rowNum }>{ idx > 0 ? idx : '' }</span>
            {
                data.map((col, idx) => ( <Seat key = { idx } data = { col } selected = {selected} addSeatToList = {(seat) => addSeatToList(seat)} deleteSeatFromList = { (seat) => deleteSeatFromList(seat) } /> ))
            }
            <span className = { localStyle.rowEnd }>&nbsp;</span>
        </div>
    )
}

class Seat extends Component {
    constructor(props) {
        super(props)

    }
    componentWillMount() {
      let { selected, data, addSeatToList } = this.props
      let bSelected = selected.filter(o => o.id == data.id).length > 0
      if(bSelected) {
        addSeatToList(data)
      }
      this.setState({
        selected: bSelected
      })
    }
    render() {
        const {data, addSeatToList, selected, deleteSeatFromList} = this.props

        return (
            <div className = { localStyle.seat }>
                { data.status === -1
                    ? <span className = { localStyle.noSeat }> </span>
                    : data.status === 1
                    ? <span className = {localStyle.unselectable}><img className = {localStyle.img} src = {imgUnselectable} /></span>
                    : this.state.selected === true
                    ? <span className = {localStyle.selected} onClick = {() => {
                        deleteSeatFromList(data)
                        this.setState({selected: false})
                    }}>
                    <div className={ localStyle.seatNo }>
                      <span>{ `${ data.seatRow }排` }</span>
                      <span>{ `${ data.seatCol }座` }</span>
                    </div>
                    <img className = {localStyle.img} src = {imgSelected} /></span>
                    : <span className = {localStyle.blank} onClick = {() => {
                        if (selected.length === 4) {
                            Toast('basic', '最多可选四个座位')
                        } else {
                            this.setState({selected: true})
                            addSeatToList(data)
                        }
                    }}>
                    <img className = {localStyle.img} src = {imgBlank} />

                    </span>
                }
            </div>
        )
    }

}

export default Seats
