import React from 'react'
import request from 'superagent'
import FoodItem from './FoodItem'
import style from './style.css'

const FoodList = (props) => {
    let FoodNodes = props.foods.map((item, idx) => {
      return (
        <FoodItem key={idx} data={item} onSelectFood = {(id, name, price, mothed) => props.onSelectFood(id, name, price, mothed)} onCount = {(mothed) => props.onCount(mothed, idx)} />
      )
    })
    return (
        <ul className = {style.list}>
          {FoodNodes}
        </ul>
    )
}

export default FoodList
