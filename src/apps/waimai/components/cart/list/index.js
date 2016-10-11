// @flow
import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'
import style from './style.css'
import { Loading } from '@boluome/blm-web-components'

// List
const List = ({ goods }) => {
	const itemNodes = goods.map((item, idx) => <ListItem key = {idx} item = { item } />)
	return <div> { goods.length === 0 ? <Loading style ={{ height: 'calc(100% - 50px)', borderBottom: '1px solid #f5f5f5' }} /> : <ul className = { style.list }>{ itemNodes }</ul> } </div>
}

List.propTypes = { goods: PropTypes.array.isRequired }

export default List

// ListItem
const ListItem = ({ item }) => {
    console.log(item)
	return (
		<li className = { style.item } onClick = {() => browserHistory.push(`/shengxian/items/${item.id}?channel=${channel}&areaId=${areaId}`) }>
            <img className = { style.img } src = { item.icon } />
            <div className = { style.info }>
				<span className = { style.title }>{ item.commodityName }</span>
				<span>{ item.spec }</span>
			</div>
		</li>
	)
}

ListItem.propTypes = { item: PropTypes.object.isRequired }
