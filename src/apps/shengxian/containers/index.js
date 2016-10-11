import React, { Component } from 'react'

import { Button, Icon, Tabbar } from '@boluome/blm-web-components'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 0
        }
    }
    render() {
        // 这是一个 flow 测试
        const str: number = 123
        console.log(typeof str, str)

        function add(num1: number, num2: number|void = 0): number {
          return num1 + num2;
        }
        var x = add(3);
        console.log(typeof x, x)
        // 测试结束
        const c = (<div><Button title = "ok" /><p>text</p></div>)
        return (
          <div>
            <Button title = "ok" />
            <Icon type = 'face' />
            <Tabbar tabs = {[1,2,3]} contents = {[(<Button title = "ok" />), (<div>ok</div>), c]} current = {this.state.current} onTabClick = {(idx) => this.setState({current: idx})} />
          </div>
        )
    }
}


export default App
