// @ flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getCinemasData, clearState } from '../actions'
import CinemasList from '../components/home/cinemas_list'

class Cinemas extends Component {
    componentWillMount() {
        document.title = '选择影院'
        const { data, getCinemasData, location } = this.props
        const { channel, filmId, cityId } = location.query
        getCinemasData(channel, filmId, cityId)
    }
    componentWillUnmount() {
        this.props.clearState('CINEMAS')
    }
    render() {
        const {data, location} = this.props
        const { channel, filmId, cityId } = location.query
        return (
            <CinemasList data = { data } channel = { channel } filmId = { filmId } cityId = { cityId } />
        )
    }
}

Cinemas.propTypes = {
    data: PropTypes.array.isRequired
}

function mapStateToProps(state) {
    return {
        data: state.cinemas.data
    }
}
function mapDispatchToProps(dispatch) {
    return {
        clearState: (page)=> dispatch(clearState(page)),
        getCinemasData: (arg1, arg2, arg3) => dispatch(getCinemasData(arg1, arg2, arg3))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cinemas)
