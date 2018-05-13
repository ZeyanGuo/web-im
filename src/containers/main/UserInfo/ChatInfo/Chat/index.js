//this.props.type为判断chat类别的方式，
//	1:表示该chat为聊天信息
//	2:表示该chat为好友信息
//	3:表示该chat为搜索信息
//	4:表示该chat为好友请求


import React from 'react';
import './index.css';
import Portrait from '../../../components/Portrait';
import {connect} from 'react-redux';
import actions from '../../../../../redux/actions.js';

class Chat extends React.Component{
	constructor(props){
		super(props);
		this.rejectRequest = this.rejectRequest.bind(this);
		this.agreeRequest = this.agreeRequest.bind(this);
	}
	componentWillReceiveProps(nextProps){
		if(!!nextProps.selected && (nextProps.type === 3||nextProps.type === 4)){
			this.props.showPersonInfo(nextProps.info,nextProps.type);
		}
	}
	agreeRequest(){
		this.props.ws.send(JSON.stringify({
			type:'addFriend',
			code:2,
			id:this.props.id,
			friendId:this.props.info.id
		}))
		this.props.clearIndex();
	}
	rejectRequest(){
		this.props.ws.send(JSON.stringify({
			type:'addFriend',
			code:3,
			id:this.props.id,
			friendId:this.props.info.id
		}))

		this.props.clearIndex();
	}
	render(){
		let props = this.props,
			operationBtn = (<div className = "IM-friend-operation-container"><button className = "IM-friend-operation-btn" onClick = {this.agreeRequest}>同意</button><button className = "IM-friend-operation-btn" onClick = {this.rejectRequest}>拒绝</button></div>)

		let chatSmallShowCount = <span className = "IM-chat-info-inner-number">{props.info.unReadMsg>99?'...':props.info.unReadMsg}</span>,
			lastMessage = <p style = {{color:'gray'}}>{props.info.lastMessage}</p>;
		return (
			<div style = {{fontSize:props.fontSize,background:this.props.selected?'#595a64':'',display:this.props.show===false?"none":"block"}} className = "IM-chat-main" data-index = {this.props.index} data-chatid = {props.info?props.info.code === 1?props.info.chatId:'':''}>
				{props.info?props.info.code===1&&props.info.unReadMsg>0?chatSmallShowCount:'':''}
				<Portrait src = {props.info?props.info.headImg:''} headPopup = {props.info?props.info.headPopup:false} id = {props.info?props.info.id:''} />
				<div className = "IM-chat-detail">
					<p>{props.info?props.info.name:'未命名'}</p>
					{props.info?props.info.code === 1?lastMessage:'':''}
				</div>
				{props.info?props.info.code === 4?operationBtn:'':''}
			</div>
		)
	}
}

const mapStoreToProps = (store) => {
	return {
		ws: store.loginReducer.userInfo.ws,
		id: store.loginReducer.userInfo.id
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		showPersonInfo:(info,type) => {dispatch(actions.showPersonInfo(info,type))}
	}
}

export default connect(mapStoreToProps,mapDispatchToProps)(Chat);