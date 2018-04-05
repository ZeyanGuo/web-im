import React from 'react';
import {connect} from 'react-redux';
import './index.css';
import InputBox from '../../../../components/inputBox';
import NormalButton from '../../../../components/NormalButton';
import HeadImgUpdatePopup from '../HeadImgUpdatePopup';
import actions from '../../../../redux/actions.js';
import PromptDialog from '../../../../components/promptDialog';
import utils from '../../../../utils';
class BaseInfoPopup extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showChangeHead:false,
			username:'',
			gender:'male',
			promptDialog:{

			},
			normalBtnLoading:false
		}
		this.showChangeHeadImg = this.showChangeHeadImg.bind(this);
		this.hideChangeHeadImg = this.hideChangeHeadImg.bind(this);
		this.changeUsername = this.changeUsername.bind(this);
		this.changeGender = this.changeGender.bind(this);
		this.updateBaseInfo = this.updateBaseInfo.bind(this);
		this.hideComponent = this.hideComponent.bind(this);
		this.changeBaseInfoToStore = this.changeBaseInfoToStore.bind(this);
	}
	hideComponent(e){	
		this.setState({
			promptDialog:{
				show:false
			}
		})
	}
	showChangeHeadImg(){
		this.setState({
			showChangeHead:true
		});
	}
	hideChangeHeadImg(){
		this.setState({
			showChangeHead:false
		});
	}
	componentDidMount(){
		window.addEventListener('message',(e)=>{
			this.props.changeUserImg(JSON.parse(e.data).URL);
			this.setState({
				showChangeHead:false
			});
		});
		this.setState({
			username:this.props.baseInfo&&this.props.baseInfo.name,
			gender:this.props.baseInfo.gender?this.props.baseInfo.gender:'male'
		})
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			username:nextProps.baseInfo&&nextProps.baseInfo.name,
			gender:nextProps.baseInfo.gender?nextProps.baseInfo.gender:'male'
		});
	}
	changeUsername(e){
		e.preventDefault();
		this.setState({
			username:e.target.value
		});
	}
	changeGender(e){
		this.setState({
			gender:e.target.value
		})
	}
	changeBaseInfoToStore(){
		this.props.changeBaseInfo({
			name:this.state.username,
			gender:this.state.gender
		})
		this.props.hideBaseInfo();
	}
	updateBaseInfo(){
		if(!this.state.username){
			this.setState({
				promptDialog:{
					text:'请输入您的昵称',
					show:true,
					onClick:function(){}
				},
			});
			return;
		}
		if(!this.state.gender){
			this.setState({
				promptDialog:{
					text:'请输入您的性别',
					show:true,
					onClick:function(){}
				},
			});
			return;
		}
		let data = {
			id:this.props.id,
			name:this.state.username,
			gender:this.state.gender
		}
		this.setState({
			normalBtnLoading:true
		});
		utils.postFetch('/methods/updateBaseInfo.json',data)
		.then((res)=>{
			return res.json();
		})
		.then((data)=>{
			if(data.status === 'ok'){//登录成功
				this.setState({
					promptDialog:{
						text:'修改成功',
						show:true,
						onClick:this.changeBaseInfoToStore
					},
					normalBtnLoading:false
				});
				
			}
			else if(data.status === 'err'){
				this.setState({
					promptDialog:{
						text:'服务器忙请稍后重试',
						show:true,
						onClick:function(){}
					},
					normalBtnLoading:false
				});
			}
		})
	}
	render(){
		let imgURL = this.props.baseInfo&&this.props.baseInfo.headImg,
			promptDialog = this.state.promptDialog;
		return (
			<div className = "IM-baseInfo-popup">
				<img className = "IM-baseInfo-portrait" onClick = {this.showChangeHeadImg}  src = {imgURL?imgURL:require('../../../../../static/noneImg.png')} />
				<div className = "IM-baseInfo-name">
					<p>昵称:</p>
					<p>性别:</p>
				</div>
				<div className = "IM-baseInfo-input">
					<InputBox onChange = {this.changeUsername} value = {this.state.username} />
					<div className = "IM-baseInfo-gender-select">
						<label htmlFor = "male">男</label>
						<input onChange = {this.changeGender} checked = {this.state.gender === 'male'?true:false}  id = "male" type = "radio" name = "gender" value = "male"/>
						<label style={{marginLeft:'30px'}} htmlFor = "female">女</label>
						<input onChange = {this.changeGender} checked = {this.state.gender === 'female'?true:false}  id = "female" type = "radio" name = "gender" value = "female" />
					</div>
				</div>
				<NormalButton onClick = {this.updateBaseInfo} loading = {this.state.normalBtnLoading} value = "提 交"  />
				{this.state.showChangeHead?<HeadImgUpdatePopup hideChangeHeadImg = {this.hideChangeHeadImg} />:''}
				<PromptDialog hideComponent = {this.hideComponent} text = {promptDialog.text} show = {promptDialog.show} onClick = {promptDialog.onClick}></PromptDialog>
			</div>
		)
	}
}

const mapStoreToProps = (store) => {
	return {
		baseInfo:store.loginReducer.userInfo.baseInfo,
		id:store.loginReducer.userInfo.id
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		changeUserImg:(url)=>{dispatch(actions.changeUserImg({url:url}))},
		changeBaseInfo:(info)=>{dispatch(actions.changeBaseInfo(info))},
		hideBaseInfo:(info)=>{dispatch(actions.hideBaseInfoPopup())}
	}
}

export default connect(mapStoreToProps,mapDispatchToProps)(BaseInfoPopup);






