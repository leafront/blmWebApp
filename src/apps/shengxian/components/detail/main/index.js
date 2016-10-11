// @flow
import React, { PropTypes } from 'react'
import style from './style.css'

const Main = ({info}) => {
    const { commodityName, categoryName, deliveryTips, placeOfOrigin, spec } = info
    // let desc = []
    // if (description) desc = description.split('<br>').map((ele, idx) => <p key = { idx } className = { style.desc }>{ deliveryTips }</p>)
    return (
        <main className = { style.main }>
            <section className = { style.head } style = {{ backgroundImage: '' }}>
                <img className = { style.image } src = {''} />
                <div className = { style.text }>
                    <span>{commodityName} {categoryName}</span>
                    <span>{deliveryTips}</span>
                    <span>{placeOfOrigin}</span>
                    <span>{spec} 上映</span>
                </div>
            </section>
            <section className = { style.body }>
                <span><strong></strong>{spec}</span>
                <span><strong></strong>{spec}</span>
            </section>
        </main>
    )
}

Main.propTypes = {
    info: PropTypes.object.isRequired
}

export default Main
