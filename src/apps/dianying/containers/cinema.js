// @ flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getCinemaInfo, changeScheduleTab, clearState } from '../actions'
import Slider from '../components/cinema/slider'
import Schedule from '../components/cinema/schedule'
import { Loading } from '@boluome/blm-web-components'

let currentFilm = {
  id: ''
}
class Cinema extends Component {
    constructor(props) {
      super(props)
    }
    componentWillUpdate() {
      //console.log(this.props)
    }
    componentWillMount() {
        const { info, location, params, getCinemaInfo } = this.props
        const { channel, filmId, cityId } = location.query
        getCinemaInfo(channel, params.cinemaId, cityId, filmId)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.info.name && document.title !== nextProps.info.name) document.title = nextProps.info.name
    }
    componentWillUnmount() {
        this.props.clearState('CINEMA')
    }
    render() {
        const { info, films, plans, location, current, changeScheduleTab, params, getCinemaInfo } = this.props
        let { channel, filmId } = location.query
        const { cinemaId } = params

        if (!filmId && films && films.length !== 0) {filmId = films[0].id}
        return (
            <div>
                { !films ? <Loading /> :
                    <div>
                        <Slider { ...{ getCinemaInfo, cinemaId, ...location.query, currentFilm } }  info = {info} films = {films} filmId = {location.query.filmId} />
                        <Schedule { ...{ plans, info, channel, filmId, cinemaId, current }} changeScheduleTab = {(idx) => changeScheduleTab(idx)} film = {currentFilm} />
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps({ cinema }) {
    let { info, films, plans, scheduleCurrent } = cinema
    films && (currentFilm = films.filter(film => film.id == currentFilm.id)[0])
    if(currentFilm && currentFilm.pic) {
      localStorage.setItem('film', JSON.stringify(currentFilm))
    }
    return {
      currentFilm,
      info,
      films,
      plans,
      current: scheduleCurrent
    }
}
function mapDispatchToProps(dispatch) {
    return {
        clearState: (page) => dispatch(clearState(page)),
        getCinemaInfo: (channel, cinemaId, cityId, filmId) => {
          currentFilm.id = filmId
          localStorage.removeItem('selectedSeat')
          dispatch(getCinemaInfo(channel, cinemaId, cityId, filmId))
        },
        changeScheduleTab: (idx) => dispatch(changeScheduleTab(idx))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cinema)
