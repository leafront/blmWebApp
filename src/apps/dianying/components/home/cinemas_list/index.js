// @flow
import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'
import localStyle from './style.css'
import classnames from 'classnames'
import { Loading } from '@boluome/blm-web-components'

// CinemasList
const CinemasList = ({ data, style, filmId, channel, cityId }) => {
	const itemNodes = data.map((item, idx) => <Cinema key = {idx} data = { item } channel = {channel} filmId = { filmId } cityId = { cityId } />)
	return (
		<div style = { style }>
			<div>{data.length === 0 ? <Loading /> : <ul className = { localStyle.list }>{ itemNodes }</ul>}</div>
		</div>
	)
}

CinemasList.propTypes = { data: PropTypes.array.isRequired }

export default CinemasList

// Cinema
const Cinema = ({ data, channel, filmId, cityId }) => {
	return (
		<li className = { classnames(localStyle.item, localStyle.cinema) }
		onClick = { () => {
				localStorage.setItem('cinema', JSON.stringify(data))
				filmId ? browserHistory.push(`/dianying/cinemas/${data.id}?channel=${channel}&filmId=${filmId}&cityId=${cityId}`) : browserHistory.push(`/dianying/cinemas/${data.id}?channel=${channel}&cityId=${cityId}`)
		}}>
			<span className = { localStyle.row }><strong className = { localStyle.name }>{ data.name }</strong></span>
			<span className = { localStyle.row }><span>{ data.address }</span></span>
			<span className = { localStyle.row }><span>{ data.distance }</span></span>
		</li>
	)
}

Cinema.propTypes = { data: PropTypes.object.isRequired }
// <div className = { localStyle.header }><span>区域</span><span>搜索</span></div>
