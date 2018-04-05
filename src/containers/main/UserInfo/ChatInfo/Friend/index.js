import React from 'react';
import './index.css';
import Category from '../Category';
import Chat from '../Chat';
import {connect} from 'react-redux';
class Friends extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showIndex:null
		}
		this.selectChat = this.selectChat.bind(this);
		this.clearShowIndex = this.clearShowIndex.bind(this);
	}
	selectChat(e){
		let target = e.target;
		if(target.tagName == 'IMG'){
			target = target.parentElement;
		}
		else if(target.tagName == 'P'){
			target = target.parentElement.parentElement;
		}
		if(target.getAttribute('class') == 'IM-chat-main'){
			this.setState({
				showIndex:target.getAttribute('data-index')
			})
		}
	}
	componentDidMount(){
		document.getElementsByClassName('IM-main-search-input')[0].addEventListener('click',this.clearShowIndex)
	}
	componentWillUnmount(){
		document.getElementsByClassName('IM-main-search-input')[0].addEventListener('click',this.clearShowIndex)
	}
	clearShowIndex(){
		this.setState({
			showIndex:null
		});
	}
	render(){
	
				// <Category cate = 'A' />
				// <Chat fontSize = "31.25px" />
				// <Category cate = 'B' />
				// <Chat fontSize = "31.25px" />
				// <Chat fontSize = "31.25px" />
				// <Chat fontSize = "31.25px" />
				// <Chat fontSize = "31.25px" />
				// <Chat fontSize = "31.25px" />
				// <Category cate = 'C' />
				// <Chat fontSize = "31.25px" />
				// <Category cate = 'F' />
				// <Chat fontSize = "31.25px" />
				// <Chat fontSize = "31.25px" />
				// <Chat fontSize = "31.25px" />
				// <Chat fontSize = "31.25px" />
				// <Chat fontSize = "31.25px" />
				// <Category cate = 'Y' />
				// <Chat fontSize = "31.25px" />
			let index = 0;
			let reqFriends = this.props.requstFriendList.map((obj)=>{
				let selected = false;
				if(this.state.showIndex == index){
					selected = true;
				}	
				obj.headPopup = true;
				obj.code = 4;
				return <Chat fontSize="32.5px" info = {obj} clearIndex = {this.clearShowIndex} key = {index} index = {index++} selected = {selected} type = {4} />
			});
			let FriendList = this.props.FriendList.map((obj)=>{
				let selected = false;
				if(this.state.showIndex == index){
					selected = true;
				}	
				obj.headPopup = true;
				obj.code = 2;
				return <Chat fontSize="32.5px" info = {obj} clearIndex = {this.clearShowIndex} key = {index} index = {index++} selected = {selected} type = {4} />
			});

		return (
			<div onClick = {this.selectChat}>
				{this.props.requstFriendList.length>0?<Category cate = '好友请求' />:''}
				{this.props.requstFriendList.length>0?reqFriends:''}
				<Category cate = '好友列表' />
				{this.props.FriendList.length>0?FriendList:<div className = "IM-span-no-friend"><span className = "IM-span-no-friend-span">还未拥有好友</span></div>}
			</div>
		)
	}
}

const mapStoreToProps = (store) => {
	return {
		requstFriendList:store.mainReducer.RequestFriendList,
		FriendList:store.mainReducer.FriendList
	}
}

export default connect(mapStoreToProps)(Friends); 