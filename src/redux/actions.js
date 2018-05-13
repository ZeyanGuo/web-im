//initial actions
import {types} from './types';
import utils from '../utils';
import config from '../config.js';

const login=(userInfo) => {
	return {
		type:types.LOGIN,
		userInfo
	};
}
const logout=(userInfo) => {
	return {
		type:types.LOGOUT,
		userInfo
	}
}

const redirectToMain = (userInfo) => {
	return {
		type:types.REDIRECTTOMAIN,
		userInfo
	}
}

const redirectToLogin = (userInfo) => {
	return {
		type:types.REDIRECTTOLOGIN,
		userInfo
	}
}



const checkUser=(info,history) => {
	return (dispatch)=>{
		return utils.getFetch('/methods/checkUserByCookie.json')
		.then((res)=>{
			return res.json();
		})
		.then((data)=>{
			if(data.result.login){
				//means has the user.
				let ws = new WebSocket(config.ws+'/methods/ws.json');  
				
				ws.onopen = () => {
					ws.send(JSON.stringify({
						id:data.result.id,
						type:'login'
					}));
				}
				if(info&&info.from == 'main'){//在登录的情况下后退到login，则进行重定向
					history.push('/main');
				}
				else{
					dispatch(redirectToMain({
						id:data.result.id,
						account:data.result.account,
						baseInfo:data.result.baseInfo,
						ws:ws
					}));
					dispatch(storeListInfo({
						RequestFriendList:data.result.receivedRequestList,
						SendedRequestList:data.result.sendedRequestList,
						ChatList:data.result.chatList,
						FriendList:data.result.friendList
					}))
				}
			}
			else{
				//router to the login Page
				if(info&&info.from == 'login'){//在未登录的情况下后退到main，则进行重定向
					history.push('/login')
				}
				dispatch(redirectToLogin({}));
			}
		});
	}
} 

const showUserInfo = (info) => {
	return {
		type:types.SHOWUSERINFO,
		id:info.id,
		mouseX:info.mouseX,
		mouseY:info.mouseY
	}
}
const hideUserInfo = (info) =>{
	return {
		type:types.HIDEUSERINFO
	}
}

const changeUserImg = (info) => {
	return {
		type:types.CHANGEUSERIMG,
		url:info.url
	}
}

const hideBaseInfoPopup = () => {
	return {
		type:types.HIDEBASEINFO
	}
}

const showBaseInfoPopup = () => {
	return {
		type:types.SHOWBASEINFO
	}
}

const changeBaseInfo = (info) => {
	return {
		type:types.CHANGEBASEINFO,
		info
	}
}
const showPersonInfo = (info,type) => {
	return {
		type:types.SHOWPERSONINFO,
		showType:type,
		info
	}
}
const showFriendRequest = (info) => {
	return {
		type:types.SHOWFRIENDREQUEST,
		info
	}
}

const storeListInfo = (info) => {
	return {
		type:types.STORELISTINFO,
		info
	}
}

const showNewFriend = (info) => {
	return {
		type:types.SHOWNEWFRIEND,
		info
	}
}

const deleteTheRequest = (info) => {//删除请求,包括发起的请求
	return {
		type:types.DELETETHEREQUEST,
		info
	}
}

const addToSendedFriendList = (info) => {
	return {
		type:types.ADDTOSENDEDFRIENDLIST,
		info
	}
}

const deleteFriend = (info) => {
	return {
		type:types.DELETEFRIEND,
		info
	}
}

const showChatPage = (info) => {
	return {
		type:types.SHOWCHATPAGE,
		info
	}
}

const createSingleChat = (info) => {
	return {
		type:types.CREATESINGLECHAT,
		info
	}
}

const addMessageRemind = (info) => {
	return {
		type:types.ADDMESSAGEREMIND,
		info
	}
}

const replaceLastMessage = (info) => {
	return {
		type:types.REPLACELASTMESSAGE,
		info
	}
}

const dispatchSingleChat = (info) => {
	return {
		type:types.DISPATCHSINGLECHAT,
		info
	}
}

const clearUnReadMsg = (info) => {
	return {
		type:types.CLEARUNREADMSG,
		info
	}
}

const showGroupChatPage = (info) => {
	return {
		type:types.SHOWGROUPCHATPAGE,
		info
	}
}

const hideGroupChatPage = (info) => {
	return {
		type:types.HIDEGROUPCHATPAGE,
		info
	}
}

const createGroupChat = (info) => {
	return {
		type:types.CREATEGROUPCHAT,
		info
	}
}

const dispatchGroupChat = (info) => {
	return {
		type:types.DISPATCHGROUPCHAT,
		info
	}
}

const hideChatListByChatId = (info) =>{
	return {
		type:types.HIDECHATLISTBYCHATID,
		info
	}
}

const showChatListByChatId = (info) => {
	return {
		type:types.SHOWCHATLISTBYCHATID,
		info
	}
}

const showChatListByFriendId = (info) => {
	return {
		type:types.SHOWCHATLISTBYFRIENDID,
		info
	}
}

const hideChatListByFriendId = (info) => {
	return {
		type:types.HIDECHATLISTBYFRIENDID,
		info
	}
}

const showMainPage = (info) => {
	return {
		type:types.SHOWMAINPAGE,
		info
	}
}

const setSelect = (info) =>{
	return {
		type:types.SETSELECT,
		info
	}
}

export default {
	login:login,
	logout:logout,
	redirectToMain:redirectToMain,
	redirectToLogin:redirectToLogin,
	checkUser:checkUser,
	showUserInfo:showUserInfo,
	hideUserInfo:hideUserInfo,
	changeUserImg:changeUserImg,
	hideBaseInfoPopup:hideBaseInfoPopup,
	showBaseInfoPopup:showBaseInfoPopup,
	changeBaseInfo:changeBaseInfo,
	showPersonInfo:showPersonInfo,
	showFriendRequest:showFriendRequest,
	storeListInfo:storeListInfo,
	showNewFriend:showNewFriend,
	deleteTheRequest:deleteTheRequest,
	addToSendedFriendList:addToSendedFriendList,
	deleteFriend:deleteFriend,
	showChatPage:showChatPage,
	createSingleChat:createSingleChat,
	addMessageRemind:addMessageRemind,
	replaceLastMessage:replaceLastMessage,
	dispatchSingleChat:dispatchSingleChat,
	clearUnReadMsg:clearUnReadMsg,
	showGroupChatPage:showGroupChatPage,
	hideGroupChatPage:hideGroupChatPage,
	createGroupChat:createGroupChat,
	dispatchGroupChat:dispatchGroupChat,
	hideChatListByChatId:hideChatListByChatId,
	showChatListByChatId:showChatListByChatId,
	showChatListByFriendId:showChatListByFriendId,
	hideChatListByFriendId:hideChatListByFriendId,
	showMainPage:showMainPage,
	setSelect:setSelect
}
