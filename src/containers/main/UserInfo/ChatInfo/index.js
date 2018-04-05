import React from 'react';
import './index.css';
import ChatContainer from './ChatContainer';
import Friend from './Friend';
import {connect} from 'react-redux';
class ChatInfo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showChat:true
		}
		this.showChat = this.showChat.bind(this);
		this.showFriend = this.showFriend.bind(this);
	}

	showChat(){
		if(!this.state.showChat){
			this.setState({
				showChat:true
			});
		}
	}

	showFriend(){
		if(this.state.showChat){
			this.setState({
				showChat:false
			});
		}
	}

	render(){
	
		let showComponent,chatCount=0,friendCount=0,chatShow=false,friendShow=false,chatShowCount,friendShowCount;
		if(this.state.showChat){
			showComponent = <ChatContainer />
		}
		else{
			showComponent = <Friend />
		}
		if(this.props.friendList.length>0){
			friendShow = true;
			if(this.props.friendList.length>99){
				friendCount = '...'
			}
			else{
				friendCount = this.props.friendList.length;
			}
		}
		if(this.props.chatList.length>0){
			chatCount = this.props.chatList.reduce((total,obj)=>{
				return total+obj.unReadMsg;
			},0);
		}
		if(chatCount>0){
			chatShow = true;
			if(chatCount>99){
				chatCount = '...'
			}
		}
		chatShowCount = <span className = "IM-chat-info-number">{chatCount}</span>;
		friendShowCount =< span className = "IM-chat-info-number">{friendCount}</span>;
		//判断获取chat聊天的数量
		return(
			<div className = "IM-chat-info-container">
				<div className = "IM-chat-info-selector">
					<span onClick={this.showChat} className = "IM-chat-info-btn">
						<svg className="IM-chat-info-icon" style = {this.state.showChat?{fill:'green'}:{}} aria-hidden="true">
						  <use xlinkHref="#icon-chat"></use>
						</svg>
						{chatShow?chatShowCount:''}
					</span>
					<span className = "IM-chat-info-btn-middle">
					|
					</span>
					<span onClick={this.showFriend} className = "IM-chat-info-btn">
						<svg className="IM-chat-info-icon" style = {!this.state.showChat?{fill:'green'}:{}} aria-hidden="true">
						  <use xlinkHref="#icon-people"></use>
						</svg>
						{friendShow?friendShowCount:''}
					</span>
				</div>
				<div className = "IM-chat-info-show">
					{
						showComponent
					}
				</div>
			</div>
		)
	}
}

const mapStoreToProps = (store) => {
	return {
		friendList:store.mainReducer.RequestFriendList,
		chatList:store.mainReducer.ChatList
	}
}

export default connect(mapStoreToProps)(ChatInfo);