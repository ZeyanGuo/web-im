import React from 'react';
import './index.css';
import NormalButton from '../../../components/NormalButton';
import {connect} from 'react-redux';
import actions from '../../../redux/actions.js';
import MD5 from 'md5';
import MessageRight from './MessageRight';
import MessageLeft from './MessageLeft';
import GroupPersonInfo from './GroupPersonInfo';
import EmojiContainer from './EmojiContainer';
import emojis from '../../../../static/emoji';
//可以将code提升到redux来进行管理页面显示
class ChatWindow extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			code:'04',
			value:'',
			message:[],
			wsOnMessage:false,
			ws:null,
			startChatLoading:false,
			moreMsg:true,
			showGroupPersons:false,
			emojiShow:false
		}
		this.sendAddFriend = this.sendAddFriend.bind(this);
		this.agreeRequest = this.agreeRequest.bind(this);
		this.deleteFriend = this.deleteFriend.bind(this);
		this.startChat = this.startChat.bind(this);
		this.onTextareaChange = this.onTextareaChange.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
		this.dealTheWsMessage = this.dealTheWsMessage.bind(this);
		this.moveToButtom = this.moveToButtom.bind(this);
		this.sendQuickMessage = this.sendQuickMessage.bind(this);
		this.getHistoryRecord = this.getHistoryRecord.bind(this);
		this.switchGroupPersons = this.switchGroupPersons.bind(this);
		this.showOrHideEmojiContainer = this.showOrHideEmojiContainer.bind(this);
		this.addEmojiToTextArea = this.addEmojiToTextArea.bind(this);
		this.showImageInput = this.showImageInput.bind(this);
		this.ImageInputChange = this.ImageInputChange.bind(this);
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.info&&nextProps.info.PersonInfo&&nextProps.info.PersonInfo.code){
			this.setState({
				code:nextProps.info.PersonInfo.code
			});
		}
		if(nextProps.ws&&!this.state.wsOnMessage){
			this.setState({
				wsOnMessage:true,
				ws:nextProps.ws
			});
			nextProps.ws.addEventListener('message',this.dealTheWsMessage);
		}
		this.setState({
			message:[],
			moreMsg:true
		});
	}
	componentWillMount(){
		if(!!this.props.ws){
			this.setState({
				wsOnMessage:true,
				ws:this.props.ws
			});
			this.props.ws.addEventListener('message',this.dealTheWsMessage);
		}
	}

	showOrHideEmojiContainer(){
		if(this.state.emojiShow){
			this.setState({
				emojiShow:false
			});	
		}
		else{
			this.setState({
				emojiShow:true
			})
		}
	}
	addEmojiToTextArea(e){
		let target = e.target;
		if(e.target.nodeName === 'I'){
			let index = e.target.getAttribute('data-index'),
				value = this.state.value;
			this.setState({
				value:value + emojis[index]
			});
		}
	}
	dealTheWsMessage(evt){
		let data = JSON.parse(evt.data);
		switch(data.type){//此处处理ws发送的message信息
			case 'groupChat':
			case 'singleChat':{
				let message = this.state.message;
				let chatId = data.chatId;
				this.props.showChatListByChatId({
					chatId:chatId
				})
				if(data.code === 0){//接收到消息回调
					let Token = data.Token,
					chatId = data.chatId,
					newMessage;
					if(data.status == 'ok'){//消息发送成功
						let messageReplace = '';
						newMessage = message.map((obj)=>{
							if(obj.Token == Token){
								obj.success = "fulfilled";
								messageReplace = obj.message;
							}
							return obj;
						});

						this.setState({//更新信息
							message:newMessage
						});
						
						this.props.replaceLastMessage({
							chatId:chatId,
							message:/^data:image/.test(messageReplace)?'[图片]':messageReplace,
							lastTimeStamp:new Date().getTime()
						})
					}
					else{//消息发送失败
						newMessage = message.map((obj)=>{
							if(obj.Token == Token){
								obj.success = "rejected";
							}
							return obj;
						});

						this.setState({
							message:newMessage
						});
					}

				}
				else if(data.code === 1){//接受到别人的消息
					let Token = data.Token,
						chatId = data.chatId,
						msgId = data.result._id,
						getTheMessage = false;
						
					if(this.props.info.chatInfo.type == 'single'){
						getTheMessage = (data.result.userId == this.props.info.PersonInfo.id && data.chatId == this.props.info.chatInfo.chatId);
					}
					else if(this.props.info.chatInfo.type == 'group'){
						getTheMessage = data.chatId == this.props.info.chatInfo.chatId;
					}
					if(getTheMessage&&this.props.info.type == 1){
						this.state.ws.send(JSON.stringify({
							type:'checkMessage',
							chatId:chatId,
							msgId:msgId,
							id:this.props.id,
							code:1
						}));
					}
					if(!getTheMessage||(this.props.info.type!=1)){//如果接收到的信息的发送者Id与现在所聊天的对象Id不一致,发送未读取
						

						//Todo
						//在对应的ChatId上提示用户接受到新的信息
						setTimeout(()=>{
							let replaceMessage;
							if(data.result.type == 'text'){
								replaceMessage = data.result.msg;
							}
							else if(data.result.type == 'image'){
								replaceMessage = '[图片]';
							}
							this.props.addMessageRemind({
								chatId:chatId,
								message:replaceMessage,
								lastTimeStamp:new Date().getTime()
							});
						},1000);
					}
					else{//如果正在聊天的用户是新消息的发送者
						let headImg;

						if(this.props.info.chatInfo.type == 'single'){
							headImg = this.props.info.PersonInfo.headImg;
						}
						else if(this.props.info.chatInfo.type == 'group'){
							headImg = this.props.info.chatInfo.users[data.result.userId];
						}

						let newMessage = {
							headImg:headImg,
							message:data.result.msg,
							success:'fulfilled',
							Token:Token,
							code:1,
							msgType:data.result.type
						}
						message.push(newMessage);
						this.setState({
							message:message
						});

						let replaceMessage;
						if(data.result.type == 'text'){
							replaceMessage = data.result.msg;
						}
						else if(data.result.type == 'image'){
							replaceMessage = '[图片]';
						}

						this.props.replaceLastMessage({
							chatId:chatId,
							message:replaceMessage,
							lastTimeStamp:new Date().getTime()
						})
						setTimeout(()=>{
							this.moveToButtom();//将条滚动到最底部	
						},0);
					}
				}
			} break;
			case 'startSingleChat':{
				let result = data.result;
				let PersonInfo = this.props.info.PersonInfo;
				let users = {};
				users[PersonInfo.id] = result.chatInfo.friendImg;
				users[this.props.id] = this.props.baseInfo.headImg;
				let dataForPage = {
					chatName:result.chatInfo.chatName,
					showType:1,
					users:users,
					chatId:result.chatId
				} 
				this.setState({
					startChatLoading:false
				});
				this.props.showChatPage(dataForPage);
			} break;
			case 'getHistoryRecord':{

				let messages = data.result,
					messageData = [],
					headImg,
					code,
					newMessages;
				for(let i = messages.length - 1 ; i >= 0 ; i --){
					headImg = this.props.info.chatInfo.users[messages[i].userId];
					code = messages[i].userId == this.props.id?0:1;
					messageData.push({
						headImg:headImg,
						message:messages[i].msg,
						success:'fulfilled',
						msgType:messages[i].type,
						code:code
					});
				}
				newMessages = messageData.concat(this.state.message);
				if(data.moreMsg){
					this.setState({
						message:newMessages
					});
				}
				else{
					this.setState({
						message:newMessages,
						moreMsg:false
					})
				}
				setTimeout(()=>{
					this.moveToHeight(messageData.length*62);//将条滚动到最底部	
				},0);
				this.props.clearUnReadMsg({
					chatId:this.props.info.chatInfo.chatId
				});
			} break;
			default:{

			}
		}
	}

	componentWillUnmount(){
		if(this.state.ws){
			this.state.ws.removeEventListener('message',this.dealTheWsMessage)
		}
	}
	moveToHeight(height){
		this.refs.MsgContainer.scrollTop = height;
	}

	switchGroupPersons(){
		this.setState({
			showGroupPersons:!this.state.showGroupPersons
		})
	}

	moveToButtom(){
		this.refs.MsgContainer.scrollTop = this.refs.MsgContainer.scrollHeight;
	}

	sendQuickMessage(e){
		if(e.keyCode == 13 && e.ctrlKey && this.state.value.length>0){
			this.sendMessage();
		}
	}
	getHistoryRecord(){
		this.props.ws.send(JSON.stringify({
			type:'getHistoryRecord',
			id:this.props.id,
			chatId:this.props.info.chatInfo.chatId,
			skipCount:this.state.message.length
		}));
	}
	deleteFriend(){
		this.props.ws.send(JSON.stringify({
			type:'deleteFriend',
			id:this.props.id,
			friendId:this.props.info.PersonInfo.id
		}))
		this.setState({
			code:'04'
		})
		this.props.hideChatListByFriendId({
			friendId:this.props.info.PersonInfo.id
		})
	}
	sendAddFriend(){
		this.props.ws.send(JSON.stringify({
			type:'addFriend',
			id:this.props.id,
			friendId:this.props.info.PersonInfo.id,
			code:1
		}));
		this.setState({
			code:'01'
		})
	}
	agreeRequest(){
		this.props.ws.send(JSON.stringify({
			type:'addFriend',
			code:2,
			id:this.props.id,
			friendId:this.props.info.PersonInfo.id
		}));
		this.setState({
			code:'03'
		});

	}
	startChat(){
		this.state.ws.send(JSON.stringify({
			type:'startSingleChat',
			id:this.props.id,
			friendId:this.props.info.PersonInfo.id
		}));

		this.setState({
			startChatLoading:true
		})
	}
	onTextareaChange(e){
		this.setState({
			value:e.target.value
		});
	}
	sendMessage(){
		if(this.state.value.length>0){
			let Token = MD5(this.props.id + new Date().getTime()),
				message = this.state.message,
			    newMessage = {
			    	headImg:this.props.baseInfo.headImg,
					message:this.state.value,
					success:'pending',
					Token:Token,
					msgType:'text',
					code:0
				}
			message.push(newMessage);
			if(this.props.info.chatInfo.type == 'single'){
				this.props.ws.send(JSON.stringify({
					type:'singleChat',
					id:this.props.id,
					friendId:this.props.info.PersonInfo.id,
					message:this.state.value,
					msgType:'text',
					Token:Token
				}));
			}
			else if(this.props.info.chatInfo.type == 'group'){
				this.props.ws.send(JSON.stringify({
					type:'groupChat',
					id:this.props.id,
					chatId:this.props.info.chatInfo.chatId,
					message:this.state.value,
					msgType:'text',
					Token:Token
				}))
			}

			this.setState({
				message:message,
				value:''
			});
			setTimeout(()=>{
				this.moveToButtom();//将条滚动到最底部	
			},100);
		}
	}
	ImageInputChange(){
		let reader = new FileReader();
		reader.readAsDataURL(this.refs.inputImage.files[0]);
		reader.onload = (e) => {
			let data = e.target.result;
			let Token = MD5(this.props.id + new Date().getTime()),
				message = this.state.message,
			    newMessage = {
			    	headImg:this.props.baseInfo.headImg,
					message:data,
					success:'pending',
					Token:Token,
					msgType:'image',
					code:0
				}
			message.push(newMessage);
			if(this.props.info.chatInfo.type == 'single'){
				this.props.ws.send(JSON.stringify({
					type:'singleChat',
					id:this.props.id,
					friendId:this.props.info.PersonInfo.id,
					message:data,
					msgType:'image',
					Token:Token
				}));
			}
			else if(this.props.info.chatInfo.type == 'group'){
				this.props.ws.send(JSON.stringify({
					type:'groupChat',
					id:this.props.id,
					chatId:this.props.info.chatInfo.chatId,
					message:data,
					msgType:'image',
					Token:Token
				}))
			}

			this.setState({
				message:message,
				value:''
			});
			setTimeout(()=>{
				this.moveToButtom();//将条滚动到最底部	
			},100);
		}
	}
	showImageInput(){
		this.refs.inputImage.click();
	}
	render(){
		let Logo = <img className = "IM-main-chat-logo" src = {require('../../../../static/logo.png')} />,
			female = <svg className="IM-person-gender" style={{fill:'#ef565b'}} aria-hidden="true"><use xlinkHref="#icon-female"></use></svg>,
			male = <svg className="IM-person-gender" style={{fill:'#43a7cd'}} aria-hidden="true"><use xlinkHref="#icon-man"></use></svg>,
			title = "",
			persons,
			showComponent;
			if(this.props.info){
				switch(this.props.info.type){
					case 0:{
						title = "";
						showComponent = Logo;
					} break;
					case 2:{}
					case 3:{}
					case 4:{
						title = "详细信息";
						let btnClick = ()=>{},
							value = '',
							deleteBtnShow = false;
						switch(this.state.code){
							case '01':{//已发送
								value = '等待验证';
							} break;
							case '02':{
								value = '同意请求';
								btnClick = this.agreeRequest;
							} break;
							case '03':{
								value = '发送消息';
								btnClick = this.startChat;
								deleteBtnShow = true;
							} break;
							case '04':{
								btnClick = this.sendAddFriend;
								value = '添加好友'
							} break;
							case 2:{
								value = '发送消息';
								btnClick = this.startChat;
								deleteBtnShow = true;
							} break;
							case 4:{
								value = '同意请求';
								btnClick = this.agreeRequest;
							} break;
						}
						let personInfo = this.props.info.PersonInfo;
						showComponent = (
							<div className = "IM-person-information">
								<img className = "IM-person-headImg" src = {this.props.info&&personInfo.headImg!=''?personInfo.headImg:require('../../../../static/noneImg.png')} />
								<br />
								<span className = "IM-person-name">{this.props.info?personInfo.name:'none'}</span>
								{this.props.info?(personInfo.gender==='male'?male:female):''}
								<br />
								<div className = "IM-person-baseInfo-title">
									<label>电话:</label>
									<br /> 
									<label>邮箱:</label>
								</div>
								<div className = "IM-person-baseInfo">
									<label>{this.props.info?personInfo.phone:'none'}</label>
									<br />
									<label>{this.props.info?personInfo.email:'none'}</label>
								</div>
								<br/>
								<NormalButton loading = {this.state.startChatLoading} onClick = {btnClick} value = {value} />
								<br/>
								{deleteBtnShow?<NormalButton id = "delete" onClick = {this.deleteFriend} value = {'删除好友'} />:''}
							</div>
						)

					} break;
					case 1:{
						//此处显示聊天窗口

						if(this.props.info.chatInfo.type == 'group'){
							persons = this.props.info.chatInfo.userInfo.filter((obj)=>{
								return obj.id !== this.props.id;
							});
						}

						let chatInfo = this.props.info.chatInfo,getMsgPrompt;

						title = chatInfo.chatName;

						let chatMessage = this.state.message.map((obj,index)=>{

							if(obj.code == 0){//表示本人的信息
								return <MessageRight 
											value = {obj.message} 
											error = {obj.success == "rejected"?true:false}
											waiting = {obj.success == 'pending'?true:false}
											headImg = {obj.headImg} 
											msgType = {obj.msgType}
											key = {index} />
							}
							else if(obj.code == 1){
								return <MessageLeft
											value = {obj.message}
											headImg = {obj.headImg} 
											msgType = {obj.msgType}
											key = {index}/>
							}
						})
						if(!!this.props.info.chatInfo.chatId){
							if(this.state.moreMsg){
								getMsgPrompt = <p><span className = "IM-chat-more-history" onClick = {this.getHistoryRecord}>点击以获取历史记录</span></p>
							}
							else{
								getMsgPrompt = <p>没有更多历史信息</p>
							}
						}
						else{
							getMsgPrompt = <p>这是新的聊天窗口</p>;
						}

						showComponent = (
							<div className = "IM-chat-container">
								<div ref = "MsgContainer" className = "IM-chat-window">
									{getMsgPrompt}
									<div className = "IM-chat-window-message">
										{chatMessage}
									</div>
								</div>
								<div className = "IM-chat-message">
									<div className = "IM-additional-tools">	
										<svg className="IM-additional-tools-style" aria-hidden="true" style={{fill:this.state.emojiShow?'green':''}} onClick = {this.showOrHideEmojiContainer}>
										  <use xlinkHref="#icon-smile"></use>
										</svg>
										<EmojiContainer show = {this.state.emojiShow} click = {this.addEmojiToTextArea} />
										<svg className="IM-additional-tools-style" aria-hidden="true" style = {{marginLeft:'5px'}} onClick = {this.showImageInput}>
										  <use xlinkHref="#icon-file"></use>
										</svg>
										<input type = "file" style={{display:'none'}} accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" onChange = {this.ImageInputChange} ref = "inputImage"></input>
									</div>
									<div className = "IM-chat-message-area">
										<textarea onKeyDown = {this.sendQuickMessage} onChange = {this.onTextareaChange} value = {this.state.value} className = "IM-chat-message-send-area">
										</textarea>
									</div>
									<div className = "IM-chat-message-send-btn">
										
										<NormalButton onClick = {this.sendMessage} value = {"发送"}></NormalButton>
										<span>ctrl+Enter</span>
									</div>
								</div>
							</div>
						)
					} break;
					default:{
						title = "";
						showComponent = Logo;
					}
				}
			}
			else{
				showComponent = Logo;
			}
		return(
			<div className = "IM-main-chat-window">
				<div className = "IM-main-chat-title">
					<span>
						{title}
					</span>
					{this.props.info.chatInfo.type == 'group'?<img className = "IM-main-chat-person-info-more" onClick={this.switchGroupPersons} style = {{transform:this.state.showGroupPersons?"rotate(0deg)":"rotate(180deg)"}} src = {require('../../../../static/groupPersonMore.png')}></img>:''}
					{this.state.showGroupPersons?<GroupPersonInfo persons = {persons} />:''}
				</div>
				<div className = "IM-main-chat-container">
					{showComponent}
				</div>

			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		showChatPage: (info)=>{dispatch(actions.showChatPage(info))},
		addMessageRemind: (info)=>{dispatch(actions.addMessageRemind(info))},
		replaceLastMessage: (info)=>{dispatch(actions.replaceLastMessage(info))},
		clearUnReadMsg:(info)=>{dispatch(actions.clearUnReadMsg(info))},
		hideChatListByChatId:(info)=>{dispatch(actions.hideChatListByChatId(info))},
		showChatListByChatId:(info)=>{dispatch(actions.showChatListByChatId(info))},
		showChatListByFriendId:(info)=>{dispatch(actions.showChatListByFriendId(info))},
		hideChatListByFriendId:(info)=>{dispatch(actions.hideChatListByFriendId(info))}
	}
}

const mapStoreToProps = (store) => {
	return {
		info: store.mainReducer.RightPageInfo,
		ws: store.loginReducer.userInfo.ws,
		id: store.loginReducer.userInfo.id,
		baseInfo: store.loginReducer.userInfo.baseInfo
	}
}

export default connect(mapStoreToProps,mapDispatchToProps)(ChatWindow);

