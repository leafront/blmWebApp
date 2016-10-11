// @flow
import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'
import localStyle from './style.css'
import classnames from 'classnames'
import CinemasList from '../cinemas_list'
import Rate from 'rc-rate'

// List
const List = ({ type, data, channel, city }) => {
	let cityId = ''
	if (city.id && city) {
		cityId = city.id[channel]
	}
	if (data.cinemas && data.cinemas.length !== 0) data = data.cinemas
	const itemNodes = data.map((item, idx) => <ListItem key = {idx} data = { item } channel = {channel} cityId = {cityId} type = {type} />)
	const movies = <ul className = { localStyle.list }>{ itemNodes }</ul>
	return <div>{ type === 0 || type === 1 ? movies : <CinemasList data = {data} channel = {channel} cityId = {cityId} /> }</div>
}

export default List

// ListItem
const ListItem = ({ data, channel, cityId, type }) => {
	let rate = (data.score / 2)
	rate = (rate) % 1 == 0 ? rate : parseInt(rate) + 0.5
	return (
		<li className = { classnames(localStyle.item, localStyle.movie) }
				onClick = {() => {
					browserHistory.push(`/dianying/movies/${data.id}?channel=${channel}&cityId=${cityId}&type=${type}`)
				}}
		>
			<img className = { localStyle.img } src = { data.pic } />
			<div className = { localStyle.info }>
				<span className = { localStyle.title }>
					<div style={{ float:'right' }}>
						{
							'3D, IMAX'.indexOf(data.dimension) >= 0 ? (
								<span className={ localStyle.tag }>
								{ data.dimension }
								</span>
							) : ''
						}

					</div>
					{ data.name }
				</span>
				<span>
					<Rate value={ (rate)  } allowHalf={ true } />
					<span style={{
						color:'#fdb22b',
						marginLeft: '10px',
						position: 'relative',
						top: '1px',
					fontSize: '0.7rem'  }}>{ data.score }</span>
				</span>
				<span>{ data.actor }</span>
				<span>
					<span>{ data.type }</span>
					<span style={{ marginLeft: '12px' }}>{ `${ data.length }分钟` } </span>
				</span>
			</div>
		</li>
	)
}

ListItem.propTypes = { data: PropTypes.object.isRequired }
