import React from 'react';
import './index.css';
import Chat from '../Chat';
import {connect} from 'react-redux';
import utils from '../../../../../utils';
import actions from '../../../../../redux/actions.js'
class ChatContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showIndex:null
		}
		this.showChatClick = this.showChatClick.bind(this);
	}
	showChatClick(e){
		let target = e.target;
		if(target.tagName == 'IMG'||target.tagName == 'SPAN'){
			target = target.parentElement;
		}
		else if(target.tagName == 'P'){
			target = target.parentElement.parentElement;
		}
		if(target.getAttribute('class') == 'IM-chat-main'){
			let chatId = target.getAttribute('data-chatid'),
				users,
				index = target.getAttribute('data-index'),
				type,
				chatName;

			if(index == this.state.showIndex){
				return;
			}

			this.props.chatList.map((obj)=>{
				if(obj.chatId == chatId){
					users = obj.users;
					type = obj.chatType;
					chatName = obj.chatName;
				}
			});
			utils.postFetch('/methods/getUsersByIds.json',{
				ids:users
			})
			.then((result)=>{
				return result.json();
			})
			.then((data)=>{
				if(data.status === 'ok'){
					if(type == 'single'){
						let resultUsers = data.users,
							chatPageData = {
								chatId:chatId,
								showType:1,
								friendInfo:{},
								users:{}
							};
						resultUsers.map((obj)=>{
							if(this.props.id != obj.userid){
								chatPageData.chatName = obj.baseInfo.name;
								chatPageData.friendInfo.email = obj.baseInfo.email;
								chatPageData.friendInfo.name = obj.baseInfo.name;
								chatPageData.friendInfo.headImg = obj.baseInfo.headImg;
								chatPageData.friendInfo.gender = obj.baseInfo.gender;
								chatPageData.friendInfo.phone = obj.baseInfo.phone;
								chatPageData.friendInfo.id = obj.userid;
							}
							chatPageData.users[obj.userid] = obj.baseInfo.headImg;
						});
						this.setState({
							showIndex:index
						})
						this.props.dispatchSingleChat(chatPageData);
					}
					else if(type == 'group'){
						let resultUsers = data.users,
							chatPageData = {
								chatId:chatId,
								showType:1,
								userInfo:[],
								users:{}
							};
						resultUsers.map((obj)=>{
							chatPageData.users[obj.userid] = obj.baseInfo.headImg;
							chatPageData.userInfo.push({
								id:obj.userid,
								headImg:obj.baseInfo.headImg,
								email:obj.baseInfo.email,
								name:obj.baseInfo.name,
								gender:obj.baseInfo.gender,
								phone:obj.baseInfo.phone
							});
						});
						chatPageData.chatName = chatName;
						this.setState({
							showIndex:index
						});
						this.props.dispatchGroupChat(chatPageData);
					}
				}
			})

		}
		
	}
	componentDidMount(){
		this.refs.chatListContainer.addEventListener('click',this.showChatClick);
	}
	componentWillUnmount(){
		this.refs.chatListContainer.removeEventListener('click',this.showChatClick);
	}
	render(){
		let chatList = this.props.chatList.map((obj,index)=>{
			let selected = false;
			if(this.state.showIndex == index){
				selected = true;
			}	
			let data = {
				chatId:obj.chatId,
				headImg:obj.chatImg,
				name:obj.chatName,
				unReadMsg:obj.unReadMsg,
				users:obj.users,
				friendId:obj.friendId,
				lastMessage:obj.lastMessage,
				code:1
			}
			return <Chat fontSize="40px" info = {data} key = {index} index = {index} selected = {selected} />
		})
		return(
			<div ref = "chatListContainer">
				{this.props.chatList.length>0?chatList:<p className = "IM-chat-list">暂时没有聊天信息</p>}
			</div>
		)
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		dispatchSingleChat:(info)=>{dispatch(actions.dispatchSingleChat(info))},
		dispatchGroupChat:(info)=>{dispatch(actions.dispatchGroupChat(info))}
	}
}
const mapStoreToProps = (store) => {
	return {
		chatList:store.mainReducer.ChatList,
		id: store.loginReducer.userInfo.id
	}
}
export default connect(mapStoreToProps,mapDispatchToProps)(ChatContainer);