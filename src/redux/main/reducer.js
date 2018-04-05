import {types} from '../types';
const initState = {
	popupDialog:{
		show:false,
		position:{
			X:0,
			Y:0
		}
	},
	showBaseInfo:false,
	showGroupChatPage:false,
	RightPageInfo:{
		type:0,
		PersonInfo:{
			id:'',
			headImg:'',
			name:'',
			email:'',
			phone:'',
			gender:''
		},
		chatInfo:{
			type:'',
			chatId:'',
			chatName:'',
			users:{},
			userInfo:[],
		}
	},
	RequestFriendList:[],//收到的好友请求
	SendedRequestList:[],//发送的好友请求
	ChatList:[],//聊天信息
	FriendList:[]//好友信息
}

const {	
		SHOWUSERINFO,
		HIDEUSERINFO,
		HIDEBASEINFO,
		SHOWBASEINFO,
		SHOWPERSONINFO,
		SHOWFRIENDREQUEST,
		STORELISTINFO,
		SHOWNEWFRIEND,
		DELETETHEREQUEST,
		ADDTOSENDEDFRIENDLIST,
		DELETEFRIEND,
		SHOWCHATPAGE,
		CREATESINGLECHAT,
		ADDMESSAGEREMIND,
		REPLACELASTMESSAGE,
		DISPATCHSINGLECHAT,
		CLEARUNREADMSG,
		SHOWGROUPCHATPAGE,
		HIDEGROUPCHATPAGE,
		CREATEGROUPCHAT,
		DISPATCHGROUPCHAT
	} = types;

const mainReducer = (status = initState,action) => {
	switch(action.type){
		case SHOWUSERINFO:{
			return {
				...status,
				popupDialog:{
					show:true,
					id:action.id,
					position:{
						X:action.mouseX,
						Y:action.mouseY
					}
				}
			}
		} break;
		case HIDEUSERINFO:{
			return {
				...status,
				popupDialog:{
					show:false,
					id:null,
					position:{
						X:null,
						Y:null
					}
				}
			}
		} break;
		case HIDEBASEINFO:{
			return {
				...status,
				showBaseInfo:false
			}
		} break;
		case SHOWBASEINFO:{
			return {
				...status,
				showBaseInfo:true
			}
		} break;
		case SHOWPERSONINFO:{
			let newRightPageInfo = {
				...status.RightPageInfo,
				type:action.showType,
				PersonInfo:{
					id:action.info.id,
					headImg:action.info.headImg,
					name:action.info.name,
					email:action.info.email,
					phone:action.info.phone,
					gender:action.info.gender,
					code:action.info.code
				}
			}
			return {
				...status,
				RightPageInfo:newRightPageInfo
			}
		} break;
		case SHOWFRIENDREQUEST:{
			let hasRequestInfo = false;
			status.RequestFriendList.map((obj)=>{
				if(obj.id == action.info.id){
					hasRequestInfo = true;
				} 
			});
			if(hasRequestInfo){
				return status;
			}
			else{
				let arrTemp = [];
				for(let i = 0;i <status.RequestFriendList.length;i++){
					arrTemp.push(status.RequestFriendList[i]);
				}
				arrTemp.push(action.info);
				return {
					...status,
					RequestFriendList:arrTemp
				}
			}
		} break;
		case STORELISTINFO:{
			let info = action.info;
			return {
				...status,
				RequestFriendList:info.RequestFriendList,
				SendedRequestList:info.SendedRequestList,
				ChatList:info.ChatList,
				FriendList:info.FriendList,
			}
		} break;
		case SHOWNEWFRIEND:{
			let info = action.info;
			let hasFriendInfo = false;
			status.FriendList.map((obj)=>{
				if(obj.id == info.id){
					hasFriendInfo = true;
				}
			});
			if(hasFriendInfo){
				return status;
			}
			else{
				let arrTemp = [];
				for(let i = 0;i < status.FriendList.length;i++){
					arrTemp.push(status.FriendList[i]);
				}
				arrTemp.push(action.info);
				return {
					...status,
					FriendList:arrTemp
				}
			}
		} break;
		case DELETETHEREQUEST:{
			let info = action.info;
			let resultReq = status.RequestFriendList.filter((obj)=>{
				return obj.id!=info.id;
			});
			let resultSend = status.SendedRequestList.filter((obj)=>{
				return obj.id!=info.id;
			});
			return {
				...status,
				RequestFriendList:resultReq,
				SendedRequestList:resultSend
			}
		} break;
		case ADDTOSENDEDFRIENDLIST:{
			let sendedList = status.SendedRequestList.map((obj)=>{
				return obj;
			});
			sendedList.push(action.info.id);
			return {
				...status,
				SendedRequestList:sendedList
			}

		} break;
		case DELETEFRIEND:{
			let newFriendList = status.FriendList.filter((obj)=>{
				return obj.id!=action.info.id
			});
			return {
				...status,
				FriendList:newFriendList
			}
		} break;
		case SHOWCHATPAGE:{
			//聊天窗口改变
			let newRightPageInfo = {
				...status.RightPageInfo,
				type:action.info.showType,
				chatInfo:{
					chatId:action.info.chatId,
					chatName:action.info.chatName,
					users:action.info.users
				}
			}
			return {
				...status,
				RightPageInfo:newRightPageInfo
			}
		} break;
		case CREATESINGLECHAT:{
			let newChatData = {
				...action.info,
				unReadMsg:0
			};
			let newChatList = status.ChatList;
			newChatList.push(newChatData);
			return {
				...status,
				ChatList:newChatList
			}
		} break;
		case ADDMESSAGEREMIND:{
		 	let chatList = status.ChatList.map((obj)=>{
				if(obj.chatId == action.info.chatId){
					obj.lastMessage = action.info.message;
					obj.unReadMsg += 1;
				}
				return obj;
			})
			return {
				...status,
				ChatList:chatList
			}
		} break;
		case REPLACELASTMESSAGE:{
			let chatList = status.ChatList.map((obj)=>{
				if(obj.chatId == action.info.chatId){
					obj.lastMessage = action.info.message;
				}
				return obj;
			})
			return {
				...status,
				ChatList:chatList
			}
		} break;
		case DISPATCHSINGLECHAT:{
			let newRightPageInfo = {
				PersonInfo:{
					id:action.info.friendInfo.id,
					headImg:action.info.friendInfo.headImg,
					name:action.info.friendInfo.name,
					email:action.info.friendInfo.email,
					phone:action.info.friendInfo.phone,
					gender:action.info.friendInfo.gender
				},
				type:action.info.showType,
				chatInfo:{
					type:'single',
					chatId:action.info.chatId,
					chatName:action.info.chatName,
					users:action.info.users,
					userInfo:[]
				}
			}
			return {
				...status,
				RightPageInfo:newRightPageInfo
			}
		} break;
		case CLEARUNREADMSG:{
			let chatId = action.info.chatId,
				newChatList;

			newChatList = status.ChatList.map((obj)=>{
				if(obj.chatId == chatId){
					obj.unReadMsg = 0;
				}
				return obj;
			})

			return {
				...status,
				ChatList:newChatList
			}
		} break;
		case SHOWGROUPCHATPAGE:{
			return {
				...status,
				showGroupChatPage:true
			}
		} break;
		case HIDEGROUPCHATPAGE:{
			return {
				...status,
				showGroupChatPage:false
			}
		} break;
		case CREATEGROUPCHAT:{
			let newChatData = {
				...action.info
			};
			let newChatList = status.ChatList.map((obj)=>{
				return obj;
			});
			newChatList.push(newChatData);
			return {
				...status,
				ChatList:newChatList
			}
		} break;
		case DISPATCHGROUPCHAT:{
			let newRightPageInfo = {
				PersonInfo:{},
				type:action.info.showType,
				chatInfo:{
					type:'group',
					chatId:action.info.chatId,
					chatName:action.info.chatName,
					users:action.info.users,
					userInfo:action.info.userInfo
				}
			}
			return {
				...status,
				RightPageInfo:newRightPageInfo
			}
		} break;
		default:{
			return status;
		}
	}
}

export default mainReducer;