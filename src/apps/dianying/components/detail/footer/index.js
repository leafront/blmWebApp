// @flow
import React from 'react'
import { browserHistory } from 'react-router'
import localStyle from './style.css'
import { Button } from '@boluome/blm-web-components'

const Footer = ({filmId, channel, cityId, showing}) => {
    return (
        <footer className = { localStyle.footer }>
            { showing ?
                <Button type = 'primary' title = '选座购票' style = {{ width: '40%', height: '45px', fontSize: '1.1rem' }} onClick = { () => browserHistory.push(`/dianying/cinemas?channel=${channel}&filmId=${filmId}&cityId=${cityId}`) } />
                :
                <Button type = 'primary' title = '未上映' style = {{ width: '40%', height: '45px', fontSize: '1.1rem', background: '#e3e3e3', border: '1px solid #e3e3e3' }} />
            }
        </footer>
    )
}

export default Footer
