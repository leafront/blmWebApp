// @flow
import React from 'react'
import localStyle from './style.css'
import { Tabbar } from '@boluome/blm-web-components'
import Content from '../content'

const Schedule = ({ info, film, plans, changeScheduleTab, current, channel, cinemaId, filmId, currentFilm}) => {
    let tabs: Array<string> = []
    let contents: Array<Object> = []
    plans.forEach((ele, idx) => {
        tabs.push(ele.dateStr)
        contents.push(<Content info={ info } plan = {ele.plan} channel = {channel} cinemaId = {cinemaId} filmId = { film.id } filmName = {film && film.name ? film.name : '[数据缺失]'} date = {ele.date} />)
    })
    return (
        <div className = { localStyle.schedule }>
            <Tabbar type = 'list' tabs = {tabs} contents = {contents} current = {current} onTabClick = {(idx) => changeScheduleTab(idx)} />
        </div>
    )
}

export default Schedule
