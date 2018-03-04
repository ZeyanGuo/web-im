import React from 'react';
import InputBox from '../../components/inputBox';
import transLan from '../../../static/zh-chan';
import './index.css';
import PromptDialog from '../../components/promptDialog';
import NormalButton from '../../components/NormalButton';
import {Link} from 'react-router-dom';
import utils from '../../utils';
import actions from '../../redux/actions';
import {connect} from 'react-redux';



class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username:'',
			password:'',
			promptDialog:{
				text:'',
				show:false,
				onClick:function(){}
			},
		};
		this.usrChange = this.usrChange.bind(this);
		this.pwdChange = this.pwdChange.bind(this);
		this.inputChange = this.inputChange.bind(this);
		this.loginBtnClick = this.loginBtnClick.bind(this);
		this.hideComponent = this.hideComponent.bind(this);
	}
	inputChange(prop,value,e){
		e.preventDefault();
		this.setState({
			[prop]:value
		});
	}
	usrChange(e){
		this.inputChange('username',e.target.value,e);
	}
	pwdChange(e){
		this.inputChange('password',e.target.value,e);
	}
	hideComponent(e){	
		this.setState({
			promptDialog:{
				show:false
			}
		})
	}
	loginBtnClick(){
		if(this.state.username.length === 0){
			this.setState({
				promptDialog:{
					text:transLan('login','error').username,
					show:true,
					onClick:function(){}
				}
			});
			return;
		}
		if(this.state.password.length === 0){
			this.setState({
				promptDialog:{
					text:transLan('login','error').password,
					show:true,
					onClick:function(){}
				}
			});
			return;
		}


		let data = {
			username:this.state.username,
			password:this.state.password
		}

		this.setState({
			normalBtnLoading:true
		});
		utils.postFetch('/methods/login.json',data)
		.then((res)=>{
			return res.json();
		})
		.then((data)=>{
			console.log(data);
			if(data.status === 'ok'){//登录成功
				this.props.loginSuccess({
					id:data.result.user.id,
					username:data.result.user.username
				});
			}
			else if(data.status === 'err'){
				this.setState({
					promptDialog:{
						text:transLan('login','error')[data.result.info],
						show:true,
						onClick:function(){}
					},
					normalBtnLoading:false
				});
			}
		})
	}
	render(){
		let promptDialog = this.state.promptDialog;
		return(
			<div className = "IM-login">
				<img className = "IM-login-logo" src = { require("../../../static/logo.png") }  />
				<div className = "IM-login-area">
					<label className = "IM-login-input-label">{transLan('login','usrname')}</label>
					<InputBox type = "text" onChange = {this.usrChange} value = {this.state.username} />
					<br />
					<label className = "IM-login-input-label">{transLan('login','password')}</label>
					<InputBox type = "password" onChange = {this.pwdChange} value = {this.state.password} />
					<br />
					<NormalButton onClick = {this.loginBtnClick} loading = {this.state.normalBtnLoading} value = {transLan('login','loginButton')} />
					<br />
					<label style = {{float:'left',marginLeft:'50px'}} className = "IM-login-info-label">{transLan('login','IMinfo')}</label>
					<Link style = {{float:'right'}} className = "IM-login-info-link" to = "/register">{transLan('login','registe')}</Link>
					<label style = {{float:'right'}} className = "IM-login-info-label">{transLan('login','registeInfo')}</label>					
				</div>
				<PromptDialog hideComponent = {this.hideComponent} text = {promptDialog.text} show = {promptDialog.show} onClick = {promptDialog.onClick}></PromptDialog>
			</div>
		)
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		loginSuccess:(user) => dispatch(actions.login({
			username:user.username
		}))
	}
}
export default connect(null,mapDispatchToProps)(Login);