// @ flow
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import request from 'superagent'
import { getFilmData } from '../actions'
import Main from '../components/detail/main'
import Footer from '../components/detail/footer'
import { Toast, Loading } from '@boluome/blm-web-components'

class Detail extends Component {
    componentWillMount() {
        const { data, getFilmData, params, location } = this.props
        if (!data.id || data.id !== parseInt(params.filmId)) getFilmData(location.query.channel, params.filmId, location.query.type)
    }
    componentWillUpdate(nextProps) {
        if (nextProps.data.name && document.title !== nextProps.data.name) document.title = nextProps.data.name
    }
    render() {
        const { data, params, location, showing } = this.props
        return (
            <div>
                { !data.id || parseInt(data.id) !== parseInt(params.filmId) ?
                    <Loading />
                    : (
                        <div>
                          <Main data = { data } />
                          <Footer filmId = { params.filmId } channel = { location.query.channel } cityId = { location.query.cityId } showing = { showing } />
                        </div>
                    )
                }
            </div>
        )
    }
}

Detail.propTypes = {
    data: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        data: state.detail.data,
        showing: state.detail.showing
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getFilmData: (arg1, arg2, arg3) => dispatch(getFilmData(arg1, arg2, arg3))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
