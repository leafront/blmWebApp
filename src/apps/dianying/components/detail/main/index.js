// @flow
import React, { PropTypes } from 'react'
import localStyle from './style.css'
import Rate from 'rc-rate'
                    //<span>{dimension} </span>
const Main = (props) => {
    const { name, dimension, score, type, length = 120, publishTime = '2016-10-20', director, actor, description, pic } = props.data
    let desc = []
    let rate = (score / 2)
    rate = (rate) % 1 == 0 ? rate : parseInt(rate) + 0.5
    if (description) desc = description.split('<br>').map((ele, idx) => <p key = { idx } className = { localStyle.desc }>{ ele }</p>)
    return (
        <main className = { localStyle.main }>
            <section className = { localStyle.head } >
                <div className = { localStyle.maskContainer }>
                  <div className = { localStyle.mask }></div>
                  <div className= {localStyle.bg} style = {{ backgroundImage: `url(${pic})` }}></div>
                </div>
                <img className = { localStyle.image } src = {pic} />
                <div className = { localStyle.text }>
                    <span className={ localStyle.name }>{name}</span>
                    <span>
                      <Rate value={ (rate)  } allowHalf={ true } disabled={ true } />
            					<span style={{ color:'#fdb22b', marginLeft: '10px', position: 'relative', top: '1px', fontSize: '0.7rem'  }}>{ score }</span>
                    </span>
                    <span><span>{ type }</span>
          					<span style={{ marginLeft: '12px' }}>{ `${ length }分钟` } </span>
                    </span>
                    <span>{publishTime} 上映</span>
                    <span>{dimension}</span>
                </div>
            </section>
            <section className = { localStyle.body }>
                <span><strong className={ localStyle.title }>导演：</strong><span className={ localStyle.content }>{director}</span></span>
                <span><strong className={ localStyle.title }>演员：</strong><span className={ localStyle.content }>{actor}</span></span>
                <span><strong className={ localStyle.title }>剧情：</strong></span>
                <span><span className={ localStyle.content } style={{width: '100%', color: '#888', marginTop: '5px'}}>{description}</span></span>
            </section>
        </main>
    )
}

Main.propTypes = {
    data: PropTypes.object.isRequired
}

export default Main
