import React from 'react';
import './index.css';
import utils from '../../../../../utils';
import {connect} from 'react-redux';
import actions from '../../../../../redux/actions.js';
class MoreOperation extends React.Component{
	constructor(props){
		super(props);
		this.logoutOperation = this.logoutOperation.bind(this);
		this.showGroupChatPage = this.showGroupChatPage.bind(this);
	}
	stopPropagation(e){
		e.stopPropagation();
	}
	logoutOperation(){
		utils.postFetch('/methods/logout.json',{id:this.props.id})
		.then((res)=>{
			return res.json();
		})
		.then((data)=>{
			if(data.status === 'ok'){
				this.props.checkUser();
				this.props.ws.close();
				this.props.showPersonInfo({
				},0);
			}
			else{
				alert('退出登录失败,请稍后重试');
			}
		})
	}
	showGroupChatPage(e){
		e.stopPropagation();
		this.props.hideComponent();
		this.props.showGroupChatPage();
	}
	componentDidMount(){
		document.getElementById('groupChat').addEventListener('click',this.showGroupChatPage);
		document.getElementById('logout').addEventListener('click',this.logoutOperation);
		document.body.addEventListener('click',this.props.hideComponent);
		document.getElementsByClassName('IM-more-operation')[0].addEventListener('click',this.stopPropagation);
	}
	componentWillUnmount(){
		document.getElementById('groupChat').removeEventListener('click',this.showGroupChatPage);
		document.getElementById('logout').removeEventListener('click',this.logoutOperation);
		document.body.removeEventListener('click',this.props.hideComponent);
		document.getElementsByClassName('IM-more-operation')[0].removeEventListener('click',this.stopPropagation);
	}
	render(){
		return(
			<div className = "IM-more-operation">
				<ul>
					<li id = "groupChat">
						<svg className="IM-more-operation-icon" aria-hidden="true">
						  <use xlinkHref="#icon-chat1"></use>
						</svg>
						<label>发起聊天</label>
					</li>
					<li id = "logout">
						<svg className="IM-more-operation-icon" aria-hidden="true">
						  <use xlinkHref="#icon-shutdown"></use>
						</svg>
						<label>退出</label>
					</li>
				</ul>
			</div>
		)
	}
}

const mapStoreToProps = (store) => {
	return {
		id:store.loginReducer.userInfo.id,
		ws:store.loginReducer.userInfo.ws
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		checkUser: () => dispatch(actions.checkUser()),
		showPersonInfo:(info,type) => {dispatch(actions.showPersonInfo(info,type))},
		showGroupChatPage:() => {dispatch(actions.showGroupChatPage())}
	}
}




export default connect(mapStoreToProps,mapDispatchToProps)(MoreOperation);


