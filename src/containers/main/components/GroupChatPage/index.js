import React from 'react';
import './index.css';
import {connect} from 'react-redux';
import actions from '../../../../redux/actions.js';
import MultipleUserSelector from '../MultipleUserSelector';
import NormalButton from '../../../../components/NormalButton';
import PromptDialog from '../../../../components/promptDialog';

class GroupChatPage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			selectIndex:null,
			selectUsers:{},
			chatName:'',
			createMessageSended:false,
			promptDialog:{
				text:'',
				show:false,
				onClick:function(){}
			},
			normalBtnLoading:false
		}
		this.hideGroupChatPage = this.hideGroupChatPage.bind(this);
		this.selectTheUser = this.selectTheUser.bind(this);
		this.hideComponent = this.hideComponent.bind(this);
		this.chatNameChange = this.chatNameChange.bind(this);
		this.createGroupChat = this.createGroupChat.bind(this);
		this.dealTheWsMessage = this.dealTheWsMessage.bind(this);
	}
	componentWillMount(){
		if(!!this.props.ws){
			this.props.ws.addEventListener('message',this.dealTheWsMessage);
		}
	}
	componentWillUnmount(){
		if(!!this.props.ws){
			this.props.ws.removeEventListener('message',this.dealTheWsMessage);
		}
	}
	dealTheWsMessage(evt){
		let data = JSON.parse(evt.data);
		switch(data.type){
			case 'createGroupChat':{
				this.setState({
					promptDialog:{
						text:'聊天群创建成功',
						show:true,
						onClick:() => {
							this.hideGroupChatPage();
						}
					},
					normalBtnLoading:false
				})
			} break;
			default:{

			}
		}
	}
	hideGroupChatPage(){
		this.props.hideGroupChatPage();
	}
	selectTheUser(e){
		let target = e.target,
			className = target.getAttribute('class'),
			index,
			newSelectUsers,
			id;
		e.stopPropagation();
		if(target.tagName == 'SPAN'|| target.tagName == 'IMG' || target.tagName == 'I'){
			index = target.parentElement.parentElement.getAttribute('data-index');
			id = target.parentElement.parentElement.getAttribute('data-id');
		}
		else if(className == 'IM-group-chat-user-check' || className == 'IM-group-chat-user-avatar' || className == 'IM-group-chat-user-name'){
			index = target.parentElement.getAttribute('data-index');
			id = target.parentElement.getAttribute('data-id');
		}
		else if(className == 'IM-group-chat-user'){
			index = target.getAttribute('data-index');
			id = target.getAttribute('data-id');
		}

		newSelectUsers = this.state.selectUsers;
		newSelectUsers[id] = !newSelectUsers[id];
		this.setState({
			selectIndex:index,
			selectUsers:newSelectUsers
		});
	}
	chatNameChange(e){
		e.preventDefault();
		this.setState({
			chatName:e.target.value
		});
	}
	hideComponent(e){	
		this.setState({
			promptDialog:{
				show:false
			}
		})
	}
	createGroupChat(){
		if(!this.state.createMessageSended){
			let ids = [],
				selectUsers = this.state.selectUsers;
			for(let id in this.state.selectUsers){
				if(selectUsers[id]){
					ids.push(id);
				}
			}
			if(this.state.chatName == ''){

				this.setState({
					promptDialog:{
						show:true,
						text:'请输入群聊名称',
						onClick:() => {}
					}
				});
				return;
			}
			if(ids.length < 2){
				this.setState({
					promptDialog:{
						show:true,
						text:'请至少选择两名好友',
						onClick:()=>{}
					}
				});
				return;
			}
			ids.push(this.props.id);//群聊添加上本人
			let createData = {
				type:'createGroupChat',
				ids:ids,
				chatName:this.state.chatName
			};
			this.setState({
				normalBtnLoading:true,
				createMessageSended:true
			})
		
			this.props.ws.send(JSON.stringify(createData))
		}
	}
	
	render(){
		let selectNow = this.state.selectIndex,
			promptDialog = this.state.promptDialog;
		let friendList = this.props.friendList.map((obj,index)=>{
			let selected = !!this.state.selectUsers[obj.id];
			return (
					<MultipleUserSelector 
						userName = {obj.name} 
						selectNow = {index == selectNow?true:false} 
						selected = {selected} 
						headImg = {obj.headImg} 
						key = {index} 
						index = {index} 
						id = {obj.id} />
				)
		})

		return (
			<div ref = "groupChatPage" className = "IM-group-chat-page" style = {{animation:"page-scale-in 0.5s ease-in-out forwards"}} >
				<button onClick = {this.hideGroupChatPage} className = "IM-group-chat-page-close">X</button>
				<div className = "IM-group-chat-title">
					<span>发起群聊</span>
				</div>
				<div className = "IM-group-chat-name">
					<input placeholder = '群聊名称' value = {this.state.chatName} onChange = {this.chatNameChange} />  
				</div>
				<div className = "IM-group-chat-users" onClick = {this.selectTheUser}> 
					{friendList}
				</div>
				<div className = "IM-group-chat-operation">
					<NormalButton value = "确定" loading = {this.state.normalBtnLoading} onClick = {this.createGroupChat} />
				</div>
				<PromptDialog hideComponent = {this.hideComponent} text = {promptDialog.text} show = {promptDialog.show} onClick = {promptDialog.onClick}></PromptDialog>
			</div>
		)
	}
}

const mapStoreToProps = (store) => {
	return {
		friendList:store.mainReducer.FriendList,
		ws:store.loginReducer.userInfo.ws,
		id:store.loginReducer.userInfo.id
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		hideGroupChatPage:() => {dispatch(actions.hideGroupChatPage())}
	}
}

export default connect(mapStoreToProps,mapDispatchToProps)(GroupChatPage);