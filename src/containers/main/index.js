import React from 'react';
import UserInfo from './UserInfo';
import ChatWindow from './ChatWindow';
import UserInfoPopup from './components/UserInfoPopup';
import BaseInfoPopup from './components/BaseInfoPopup';
import MainMask from './components/MainMask';
import GroupChatPage from './components/GroupChatPage';
import './index.css';
import {connect} from 'react-redux';
import actions from '../../redux/actions.js';

class Main extends React.Component{
	constructor(props){
		super(props);
		this.bindWS = this.bindWS.bind(this);
	}
	bindWS(ws){
		ws.onmessage = (evt) => {
			let data = JSON.parse(evt.data);
			switch(data.type){
				case "addFriend":{
					//接收到好友请求或者接收到好友同意请求
					switch(data.code){
						case 1:{//申请添加好友
							this.props.showFriendRequest({
								id:data.id,
								headImg:data.headImg,
								gender:data.gender,
								name:data.name,
								email:data.email,
								phone:data.phone	
							});
						} break;
						case 2:{//好友添加成功
							this.props.showNewFriend({
								id:data.id,
								headImg:data.headImg,
								gender:data.gender,
								name:data.name,
								email:data.email,
								phone:data.phone
							});
							this.props.deleteTheRequest({
								id:data.id
							})
						} break;
						case 3:{//添加好友被拒绝
							this.props.deleteTheRequest({
								id:data.id
							})
						} break;
						case 4:{//已发送添加好友请求
							this.props.addToSendedFriendList({
								id:data.friendId
							})
						}
					}

				} break;
				case "deleteFriend":{
					this.props.deleteFriend({
						id:data.friendId
					});
				} break;
				case "startChat":{
					let dataForPage = {
						chatId:data.chatId,
						chatName:data.chatName,
						messages:data.messages,
						users:data.users,
						showType:1,
						chatImg:data.chatImg
					} 
					this.props.showChatPage(dataForPage);
				} break;
				case "createSingleChat":{
					let dataForSingleChat = {
						chatId:data.chatId,
						chatImg:data.chatImg,
						chatName:data.chatName,
						chatType:data.chatType,
						friendId:data.friendId,
						lastMessage:data.lastMessage,
						users:data.users
					}
					this.props.createSingleChat(dataForSingleChat);
				} break;
				case "createGroupChat":{
					this.props.createGroupChat({
						chatId:data.result._id,
						chatImg:data.result.chatImg,
						chatName:data.result.name,
						chatType:data.result.type,
						lastMessage:data.result.lastMessage,
						lastTimeStamp:data.result.lastTimeStamp,
						unReadMsg:0,
						users:data.result.users
					});
				} break;
				default : {
					
				}
			}
		}
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.baseInfo&&!nextProps.baseInfo.name){//如果不存在昵称
			this.props.showBaseInfo();
		}
		if(nextProps.ws&&!nextProps.ws.onmessage){
			this.bindWS(nextProps.ws);
		}
	}

	componentDidMount(){
		if(this.props.baseInfo&&!this.props.baseInfo.name){//如果不存在昵称
			this.props.showBaseInfo();
		}
		if(this.props.ws){
			this.bindWS(this.props.ws);
		}
	}

	render(){
		return (
			<div className = "IM-main">
				<div className = "IM-main-container">
					<UserInfo></UserInfo>
					<ChatWindow></ChatWindow>
				</div>
				<UserInfoPopup />
				{this.props.show?<BaseInfoPopup />:''}
				{this.props.show?<MainMask />:''}
				{this.props.showGroupChatPage?<GroupChatPage />:''}
			</div>
		);
	}
}

const mapStoreToProps = (store) => {
	return {
		baseInfo:store.loginReducer.userInfo.baseInfo,
		show:store.mainReducer.showBaseInfo,
		ws:store.loginReducer.userInfo.ws,
		showGroupChatPage:store.mainReducer.showGroupChatPage
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		showBaseInfo: ()=>{dispatch(actions.showBaseInfoPopup())},
		hideBaseInfo: ()=>{dispatch(actions.hideBaseInfoPopup())},
		showFriendRequest: (info)=>{dispatch(actions.showFriendRequest(info))},
		showNewFriend:(info)=>{dispatch(actions.showNewFriend(info))},
		deleteTheRequest:(info)=>{dispatch(actions.deleteTheRequest(info))},
		addToSendedFriendList:(info)=>{dispatch(actions.addToSendedFriendList(info))},
		deleteFriend:(info)=>{dispatch(actions.deleteFriend(info))},
		showChatPage:(info)=>{dispatch(actions.showChatPage(info))},
		createSingleChat:(info)=>{dispatch(actions.createSingleChat(info))},
		createGroupChat:(info) => {dispatch(actions.createGroupChat(info))}
	}
}

export default connect(mapStoreToProps,mapDispatchToProps)(Main);

