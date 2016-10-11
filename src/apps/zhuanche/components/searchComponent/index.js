import React from 'react';
import localStyle from './styles.css';
import classnames from 'classnames';

export const SearchComponent = (props) => {
    let chose = props.endLocate !== '您要去哪儿';
    return (
        <div className={classnames(localStyle.searchComponentBg, chose ? localStyle.chose : '')}>
            <div className={localStyle.searchDiv} style={{marginTop: '-1rem', borderTopLeftRadius: '5px', borderTopRightRadius: '5px',}}>
                <span className={localStyle.circle}></span>
                <input className={localStyle.searchInput}
                    value={props.initalLocate}
                    readOnly
                    type = 'text' 
                    onClick = {() => props.initalClick()}
                    />
            </div>
            <div className={localStyle.searchDiv} style={{borderBottom: 0}}>
                <span className={classnames(localStyle.circle, localStyle.orange)}></span>
                <input className={localStyle.searchInput}
                    value={props.endLocate}
                    readOnly
                    type = 'text'
                    onClick = {() => props.endClick()}
                    style = {{color: '#FF6767'}}
                    />
            </div>
            { chose ? props.carType : ''}
            { chose ? <input className={localStyle.button} type='button' value='呼叫专车' onClick={props.createOrder} /> : ''}
        </div>
    )
}
