// @flow
import React from 'react'
import localStyle from './style.css'
import classnames from 'classnames'

const Footer = ({selected, total, saveConfirmParams}) => {
    return (
        <footer className = { localStyle.footer }>
            <div className = { localStyle.listWrap }>{selected.length === 0 ? <span className = { localStyle.noSelect }>尚未选座</span> : <Seats selected = {selected} />}</div>
            <div className = { localStyle.confirmWrap }>
                <span className = { localStyle.total }>￥{total || 0.0}</span>
                <span className = { localStyle.confirm } onClick = {(evt) => selected.length === 0 ? evt.stopPropagation() : saveConfirmParams()}>确认选择</span>
            </div>
        </footer>
    )
}

const Seats = ({selected}) => {
    let selectedNodes = []
    if (selected.length !== 0) {
        selectedNodes = selected.map((seat, idx) => <Seat key = {idx} data = {seat} />)
    }
    return <ul className = { localStyle.list }>{selectedNodes}</ul>
}


const Seat = ({data}) => {
    return <li className = { localStyle.item }>{data.seatRow}排{data.seatCol}座</li>
}

export default Footer
