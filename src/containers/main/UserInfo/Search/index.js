import React from 'react';
import transLan from '../../../../../static/zh-chan.js';
import './index.css';
import SearchFriendList from './SearchFriendList';
import {connect} from 'react-redux';
import utils from '../../../../utils';
class Search extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			searchValue:'',
			searchFriendListShow:false,
			peoples:[]
		}
		this.searchUsers = this.searchUsers.bind(this);
		this.searchChange = this.searchChange.bind(this);
		this.controlEnterPress = this.controlEnterPress.bind(this);
		this.hideComponent = this.hideComponent.bind(this);
	}
	searchChange(e){
		this.setState({
			searchValue:e.target.value
		});
	}
	controlEnterPress(e){
		if(e.keyCode === 13){
			this.searchUsers()
		}
	}
	hideComponent(){
		this.setState({
			searchFriendListShow:false,
			peoples:[]
		});
	}
	componentDidMount(){
		document.getElementsByClassName('IM-main-search-input')[0].addEventListener('keyup',this.controlEnterPress)
	}
	componentWillUnmount(){
		document.getElementsByClassName('IM-main-search-input')[0].removeEventListener('keyup',this.controlEnterPress)
	}
	searchUsers(){
		utils.postFetch('/methods/searchPerson.json',{
			id:this.props.id,
			name:this.state.searchValue
		})
		.then((res) => {
			return res.json()
		})
		.then((data) => {
			if(data.status === 'ok'){//对数据进行处理
				this.setState({
					searchFriendListShow:true,
					peoples:data.peoples
				})
			}
			else{
				this.setState({
					searchFriendListShow:false,
					peoples:[]
				})
			}
		})
	}
	render(){
		return (
			<div className = "IM-main-search">
				<svg className="IM-main-search-icon" aria-hidden="true">
				  <use xlinkHref="#icon-search"></use>
				</svg>
				<input onChange = {this.searchChange} className = "IM-main-search-input" placeholder = {transLan('main','search')} value = {this.state.searchValue} ></input>
				{this.state.searchFriendListShow?<SearchFriendList hideComponent = {this.hideComponent} peoples = {this.state.peoples} />:''}
			</div>
		)
	}
}
const mapStoreToProps = (store) => {
	return {
		id:store.loginReducer.userInfo.id
	}
}
export default connect(mapStoreToProps)(Search);


