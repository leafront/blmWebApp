import React from 'react';
import localStyle from './styles.css';
import classnames from 'classnames';
let valArray = {
    airlineList: [],
    time: [],
    fromAirportList: [],
    toAirportList: [],
};
const clear = () => {
    let inputAll = document.querySelectorAll('input');
    for (let i in inputAll) {
        if (inputAll[i].checked) {
            inputAll[i].checked = false;
        }
    }
    valArray = {
        airlineList: [],
        time: [],
        fromAirportList: [],
        toAirportList: [],
    };
}
const add = (val, type) => {
    let typeArray = [];
    let inputAll = document.querySelectorAll('input');
    for (let i = 0; i < inputAll.length; i++) {
        if (inputAll[i].checked && inputAll[i].parentNode.innerText === val) {
            switch (type) {
                case 'airlineList':
                    valArray.airlineList.push(val);
                    break;
                case 'time':
                    valArray.time.push(val);
                    break;
                case 'fromAirportList':
                    valArray.fromAirportList.push(val);
                    break;
                case 'toAirportList':
                    valArray.toAirportList.push(val);
                    break;
            }
            console.log(valArray);
        } else if (!inputAll[i].checked && (inputAll[i].parentNode.innerText === val)) {
            switch (type) {
                case 'airlineList':
                    valArray.airlineList.splice(valArray.airlineList.indexOf(val), 1);
                    break;
                case 'time':
                    valArray.time.splice(valArray.time.indexOf(val), 1);
                    break;
                case 'fromAirportList':
                    valArray.fromAirportList.splice(valArray.fromAirportList.indexOf(val), 1);
                    break;
                case 'toAirportList':
                    valArray.toAirportList.splice(valArray.toAirportList.indexOf(val), 1);
                    break;
            }
            console.log(valArray);
        }
    }
}
const Filter = ({filter, scheduleList, airlineList, fromAirportList, toAirportList, callBack, cancel}) => {
    if (scheduleList.length !== 0) {
        return (
            <div className={classnames(localStyle.filterWarp, filter ? localStyle.show : '')}>
                <div className={localStyle.filterContent}>
                    <div className={localStyle.filterNav}>
                        <a onClick={() => cancel(false)}>取消</a>
                        <a onClick={() => clear()}>清空已选</a>
                        <a onClick={() => {callBack(valArray);cancel(false);}}>确定</a>
                    </div>
                    <div className={localStyle.filter}>
                        <p>机型选择</p>
                        <div className={localStyle.filterInput}>
                            {scheduleList.airlineList.map((val, idx) => {
                                if (val !== '') {
                                    return (
                                        <div key={idx}>
                                            <label><input type='checkbox' onClick={() => add(val, 'airlineList')} />{val}</label>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        <p>出发时间</p>
                        <div className={localStyle.filterInput}>
                            {['00:00-06:00', '06:00-12:00', '12:00-18:00', '18:00-24:00'].map((val, idx) => {
                                if (val !== '') {
                                    return (
                                        <div key={idx}>
                                            <label><input type='checkbox' onClick={() => add(val, 'time')} />{val}</label>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        <p>出发机场</p>
                        <div className={localStyle.filterInput}>
                            {scheduleList.fromAirportList.map((val, idx) => {
                                if (val !== '') {
                                    return (
                                        <div key={idx}>
                                            <label><input type='checkbox' onClick={() => add(val, 'fromAirportList')} />{val}</label>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        <p>到达机场</p>
                        <div className={localStyle.filterInput}>
                            {scheduleList.toAirportList.map((val, idx) => {
                                if (val !== '') {
                                    return (
                                        <div key={idx}>
                                            <label><input type='checkbox' onClick={() => add(val, 'toAirportList')} />{val}</label>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (<div/>)
    }
}
export default Filter;