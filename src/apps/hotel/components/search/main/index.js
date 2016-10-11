// @flow
import React, { PropTypes , Component } from 'react'
import style from './style.css'
import classnames from 'classnames'
import { browserHistory } from 'react-router'
class Search extends Component{
  constructor(props){
    super(props)
    this.state={
      keyWord:''
    }
    this.history = JSON.parse(localStorage.getItem('HOTEL_HISTORY')) || []
  }
  keyWordChange(event){
   this.setState({keyWord: event.target.value});
  }
  selectHistory(queryText){
    browserHistory.push(`/hotel?QueryText=${queryText}`)
  }
  selectBrand(brandId,queryText){
    this.history.push(queryText)
    localStorage.setItem('HOTEL_HISTORY',JSON.stringify(this.history))
    browserHistory.push(`/hotel?BrandId=${brandId}&QueryText=${queryText}`)
  }
  selectCommercial(zone,queryText){
    this.history.push(queryText)
    localStorage.setItem('HOTEL_HISTORY',JSON.stringify(this.history))
    browserHistory.push(`/hotel?Zone=${zone}&QueryText=${queryText}`)
  }
  selectDistricts(districtId,queryText){
    this.history.push(queryText)
    localStorage.setItem('HOTEL_HISTORY',JSON.stringify(this.history))
    browserHistory.push(`/hotel?DistrictId=${districtId}&QueryText=${queryText}`)
  }
  searchKeyWord(e){
    e.preventDefault()
    const keyWord = this.state.keyWord
    this.history.push(keyWord)
    localStorage.setItem('HOTEL_HISTORY',JSON.stringify(this.history))
    browserHistory.push(`/hotel?QueryText=${keyWord}`)
  }
  render(){
    const { brandData , locationData } = this.props
    const historyNode = this.history.map((item,index) =>
      <li onClick = {() => this.selectHistory(item)} key = { index }>{item}</li>
    )
    let brandNode = []
    if(brandData.brands) brandNode = brandData.brands.map((item,index) =>  <li onClick = {() => this.selectBrand(item.id,item.name)} key = { index }>{item.name}</li> )

    let commercialNode = []
    if(locationData.commericalLocations) commercialNode = locationData.commericalLocations.map((item,index) => <li onClick = {() => this.selectCommercial(item.id,item.name)} key = {index} >{item.name}</li>)

    let districtsNode = []
    if(locationData.districts) districtsNode = locationData.districts.map((item,index) => <li onClick = {() => this.selectDistricts(item.id,item.name)} key = {index} >{item.name}</li>)
    return (
      <div className = {style.search}>
        <div className = {style.searchBar}>
          <form className = {style.submitSearch} onSubmit = {this.searchKeyWord.bind(this)}>
            <input type = "search" ref="keyWord"  onChange={this.keyWordChange.bind(this)} className = { style.keySearch } placeholder = "关键词/位置/品牌/酒店名"/>
            <button>取消</button>
          </form>
        </div>
        <div className = {style.listWrap}>
          <div className = {style.list}>
            <div className = {style.title}>
              <h4>历史记录</h4>
              <span>清除</span>
            </div>
            <ul className = {style.menu}>
              {historyNode}
            </ul>
          </div>
          <div className = {style.list}>
            <div className = {style.title}>
              <h4>品牌</h4>
            </div>
            <ul className = {style.menu}>
                {brandNode}
            </ul>
          </div>
          <div className = {style.list}>
            <div className = {style.title}>
              <h4>商业区</h4>
            </div>
            <ul className = {style.menu}>
              {commercialNode}
            </ul>
          </div>
          <div className = {style.list}>
            <div className = {style.title}>
              <h4>行政区</h4>
            </div>
            <ul className = {style.menu}>
              {districtsNode}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Search
