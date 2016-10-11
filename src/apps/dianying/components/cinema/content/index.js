// @flow
import React from 'react'
import { browserHistory } from 'react-router'
import localStyle from './style.css'
import { moment } from 'libs/utils'
import classnames from 'classnames'
const checkIsEffective = (date, o) => {
  let now   = new moment().format('x')
  let oTime = new moment(`${ date } ${ o.startTime }`).format('x')
  return (oTime - now) > 0
}
const Content = ({ info, plan, filmName, date, channel, cinemaId, filmId}) => {
    let activePlan = plan.filter(p => checkIsEffective(date, p))
    activePlan.length && (plan = activePlan)

    const hallNodes = plan.map((ele, idx) => {
        let isEffective = checkIsEffective(date, ele)
        let url = `/dianying/seat?channel=${channel}&filmId=${filmId}&cinemaId=${cinemaId}&cinemaName=${ info.name }&showId=${ele.planId}&hallId=${ele.hallId}&filmName=${filmName}&hallName=${ele.hallName}&date=${date}&time=${ele.startTime}&type=${ele.language} ${ele.screenType}&price=${ele.price}`
        return (
            <li className = { localStyle.item } key = { idx }
            onClick = { () => {
              if(isEffective) {
                localStorage.setItem('plan', JSON.stringify(ele))
                browserHistory.push(url)
              }
            }}>
                <div className = { localStyle.row }>
                    <span style={{ color: isEffective ? '' : '#b2b2b2' }}>
                      { ele.startTime }
                    </span>
                    <span style={{ color: isEffective ? '' : '#b2b2b2' }}>
                    { ele.screenType }
                    </span>
                    {
                      isEffective ? (
                        <span className = { localStyle.price }>{ `￥${ele.price}` }</span>
                      ) : (
                        <span style={{ color: '#b2b2b2' }}>已过场</span>
                      )
                    }

                </div>
                <div className = { classnames(localStyle.row, localStyle.secondary) }>
                    <span>{ ele.endTime + ' 散场' }</span>
                    <span>{ ele.hallName }</span>
                    <span></span>
                </div>
            </li>
        )
    })
    //  <span>{ channel === 'kou' ? '抠电影': '蜘蛛网' }</span>
    return (
        <ul className = { localStyle.content }>
            {hallNodes}
        </ul>
    )
}

export default Content
