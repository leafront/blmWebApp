// @flow
import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'
import style from './style.css'
import { Loading } from '@boluome/blm-web-components'

// List
const List = ({ cates, channel, areaId }) => {
	const itemNodes = cates.map((item, idx) => <ListItem key = {idx} cate = { item } channel = {channel} areaId = {areaId} />)
	return <div> { cates.length === 0 ? <Loading style ={{ height: 'calc(100% - 84px)', borderBottom: '1px solid #f5f5f5' }} /> : <ul className = { style.list }>{ itemNodes }</ul> } </div>
}

List.propTypes = { cates: PropTypes.array.isRequired }

export default List

// ListItem
const ListItem = ({ cate, channel, areaId }) => {
	return (
		<li className = { style.cate } onClick = {() => browserHistory.push(`/shengxian/cates/${cate.id}?channel=${channel}&areaId=${areaId}`) }>
			<div className = { style.info }>
				<span className = { style.title }>{ cate.name }</span>
				<span>{ cate.englishName }</span>
			</div>
            <img className = { style.img } src = { cate.icon } />
		</li>
	)
}

ListItem.propTypes = { cate: PropTypes.object.isRequired }
