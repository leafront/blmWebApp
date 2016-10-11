// @flow
import React from 'react'
// import { browserHistory } from 'react-router'
import localStyle from './style.css'
import classnames from 'classnames'

const Slider = ({info, films, filmId, getCinemaInfo, channel, cityId, cinemaId, currentFilm}) => {

    let film = {}
    let currentIdx = 0
    filmId = currentFilm.id || filmId
    if (filmId) {
        films.forEach((ele, idx) => {
            if (ele.id == filmId) {
              currentIdx = idx
              film = ele
            }
        })
    } else {
        films && (film = films[0])
    }

    const sliderNodes = films && films.map((ele, idx) => {
        return (
            <li onClick={ () => getCinemaInfo(channel, cinemaId, cityId, ele.id) } className = {classnames(localStyle.item, ele.id == filmId ? localStyle.itemCurrent : '')} key = {idx}>
                <img className = {localStyle.pic} src = { ele.pic } />
            </li>
        )
    })
    return (
        <div>
            <div className = { localStyle.title }>{info.name}</div>
            <div className = { localStyle.address }>{info.address}</div>
            <div className = { localStyle.sliderContainer }>
              <div className = { localStyle.maskContainer }>
                <div className = { localStyle.mask }></div>
                <div className= {localStyle.bg} style = {{ backgroundImage: `url(${ film&&film.pic })` }}></div>
              </div>
              <div ref={ node => {
                let slider = document.getElementById('slider')
                let ul  = slider.childNodes[0]
                let li  = ul.childNodes[currentIdx]
                let lWidth = li.offsetWidth / 2
                let lLeft  = li.offsetLeft
                let dWidth = document.body.offsetWidth / 2
                if((lWidth + lLeft) > dWidth) {
                  slider.scrollLeft = Math.abs(dWidth - (lWidth + lLeft))
                } else {
                  slider.scrollLeft = 0
                }
              } } className={ localStyle.slider } id='slider'>
                <ul >
                  { sliderNodes }
                </ul>
              </div>
            </div>
            <div className = { localStyle.film }>
                <span> </span>
                <div className = { localStyle.middle }>
                    <strong>{film && film.name ? film.name : ''}</strong>
                    <span className = { localStyle.type }>{film && film.type ? film.type: ''}</span>
                </div>
                <span className = { localStyle.arrow }> </span>
            </div>
        </div>
    )
}

export default Slider
