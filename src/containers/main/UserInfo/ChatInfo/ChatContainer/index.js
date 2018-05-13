import React from 'react';
import './index.css';
import Chat from '../Chat';
import {connect} from 'react-redux';
import utils from '../../../../../utils';
import actions from '../../../../../redux/actions.js'
import DeleteOperation from '../DeleteOperation';
class ChatContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showIndex:null,
			deleteInfo:{
				chatId:null,
				index:null
			},
			deleteOperation:{
				show:false,
				x:null,
				y:null
			}
		}
		this.showChatClick = this.showChatClick.bind(this);
		this.showDeleteOperation = this.showDeleteOperation.bind(this);
		this.hideDeleteOperation = this.hideDeleteOperation.bind(this);
		this.deleteChat = this.deleteChat.bind(this);
	}
	deleteChat(){
		this.props.ws.send(JSON.stringify({
			type:'deleteChat',
			chatId:this.state.deleteInfo.chatId,
			userId:this.props.id
		}));
		if(this.props.RightPageInfo.chatInfo.chatId === this.state.deleteInfo.chatId && this.props.RightPageInfo.type === 1){
			this.props.showMainPage();
		}
	}
	hideDeleteOperation(e){
		this.setState({
			deleteOperation:{
				show:false,
				x:null,
				y:null
			}
		})
	}
	showDeleteOperation(e){
		if(e.button === 2){//鼠标右键点击
			let target = e.target,
				x = e.clientX,
				y = e.clientY;
			this.setState({
				deleteOperation:{
					show:true,
					x:x,
					y:y
				}
			});

			if(target.tagName == 'IMG' || target.tagName == "SPAN"){
				target = target.parentElement;
			}
			else if(target.tagName == 'P'){
				target = target.parentElement.parentElement;
			}
			if(target.getAttribute('class') == 'IM-chat-main'){
				let chatId = target.getAttribute('data-chatid'),
					index = target.getAttribute('data-index');
				this.setState({
					deleteInfo:{
						chatId:chatId,
						index:index
					}
				});
			}
			return false;
		}
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
		this.refs.chatListContainer.addEventListener('mousedown',this.showDeleteOperation);
		document.oncontextmenu = ()=>{
			return false;
		}
		document.body.addEventListener('click',this.hideDeleteOperation);
	}
	componentWillUnmount(){
		this.refs.chatListContainer.removeEventListener('click',this.showChatClick);
		this.refs.chatListContainer.removeEventListener('mousedown',this.showDeleteOperation);
		document.body.removeEventListener('click',this.hideDeleteOperation);
	}
	render(){
		var count = 0;
		if(this.props.select){
			this.setState({
				showIndex:0		
			})
			this.props.setSelect();
		}
		if(this.props.incSelect){
			if(!!this.state.showIndex){
				this.setState({
					showIndex:this.state.showIndex+1
				});
			}
			this.props.setSelect();
		}
		this.props.chatList.map((obj)=>{
			if(obj.lastTimeStamp == ''){
				obj.lastTimeStamp = count++;
			}
		})



		let chatListTemp = this.props.chatList.sort((a,b)=>{
			return b.lastTimeStamp - a.lastTimeStamp;
		});

		let chatList = chatListTemp.map((obj,index)=>{
			let selected = false,
				show = obj.show;
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
			return <Chat fontSize="40px" info = {data} key = {index} index = {index} selected = {selected} show = {show} />
		})
		let deleteOperation = <DeleteOperation x = {this.state.deleteOperation.x} y = {this.state.deleteOperation.y} click = {this.deleteChat}></DeleteOperation>;
		return(
			<div ref = "chatListContainer">
				{this.props.chatList.length>0?chatList:<p className = "IM-chat-list">暂时没有聊天信息</p>}
				{this.state.deleteOperation.show?deleteOperation:null}
			</div>
		)
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		dispatchSingleChat:(info)=>{dispatch(actions.dispatchSingleChat(info))},
		dispatchGroupChat:(info)=>{dispatch(actions.dispatchGroupChat(info))},
		showMainPage:(info)=>{dispatch(actions.showMainPage(info))},
		setSelect:(info)=>{dispatch(actions.setSelect(info))}
	}
}
const mapStoreToProps = (store) => {
	return {
		RightPageInfo:store.mainReducer.RightPageInfo,
		chatList:store.mainReducer.ChatList,
		id: store.loginReducer.userInfo.id,
		ws: store.loginReducer.userInfo.ws,
		select:store.mainReducer.select,
		incSelect:store.mainReducer.incSelect
	}
}
export default connect(mapStoreToProps,mapDispatchToProps)(ChatContainer);