import React from 'react';
import './index.css';
import transLan from '../../../static/zh-chan';
import InputBox from '../../components/inputBox';
import {Link} from 'react-router-dom';
import NormalButton from '../../components/NormalButton';
import actions from '../../redux/actions';
import PromptDialog from '../../components/promptDialog';
import {connect} from 'react-redux';
import utils from '../../utils';

class Register extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username:{
				value:'',
				error:true,
				showError:false
			},
			password:{
				value:'',
				error:true,
				showError:false
			},
			chpwdword:{
				value:'',
				error:true,
				showError:false
			},
			phone:{
				value:'',
				error:true,
				showError:false
			},
			email:{
				value:'',
				error:true,
				showError:false
			},
			promptDialog:{
				text:'',
				show:false,
				onClick:function(){}
			},
			normalBtnLoading:false
		};
		this.usrChange = this.usrChange.bind(this);
		this.pwdChange = this.pwdChange.bind(this);
		this.inputChange = this.inputChange.bind(this);
		this.chPwdChange = this.chPwdChange.bind(this);
		this.phoneChange = this.phoneChange.bind(this);
		this.emailChange = this.emailChange.bind(this);
		this.baseCheck = this.baseCheck.bind(this);
		this.registeBtnClick = this.registeBtnClick.bind(this);
		this.hideComponent = this.hideComponent.bind(this);
		this.redirectToLogin = this.redirectToLogin.bind(this);
	}
	inputChange(prop,value,e,checkInfo){
		e.preventDefault();
		this.setState({
			[prop]:{
				value:value,
				error:checkInfo.error,
				showError:checkInfo.showError
			}
		});
	}

	usrChange(e){
		let username = e.target.value,
			checkInfo = {
				showError:false,
				error:true
			};

		if(username.length>=6){
			checkInfo.showError = false;
			checkInfo.error = false;
		}
		else{
			checkInfo.showError = true;
			checkInfo.error = true;
		}

		this.inputChange('username',e.target.value,e,checkInfo);
	}
	pwdChange(e){
		let password = e.target.value,
			checkInfo = {
				showError:false,
				error:true
			};

		if(password.length>=6){
			checkInfo.showError = false;
			checkInfo.error = false;
		}
		else{
			checkInfo.showError = true;
			checkInfo.error = true;
		}

		this.inputChange('password',e.target.value,e,checkInfo);
	}
	chPwdChange(e){

		let chpwdword = e.target.value,
			checkInfo = {
				showError:false,
				error:true
			};

		if(chpwdword.length>=6){
			checkInfo.showError = false;
			checkInfo.error = false;
		}
		else{
			checkInfo.showError = true;
			checkInfo.error = true;
		}

		this.inputChange('chpwdword',e.target.value,e,checkInfo);
	}

	//phone value input.
	phoneChange(e){
		if(e.keyCode === 9) return;
		let phoneValue = this.state.phone.value+String.fromCharCode(e.keyCode);
		let checkInfo = {
			error:true,
			showError:true
		};

		if(/^((34)|(8))$/.test(e.keyCode)){
			//make the delete Method
			phoneValue = phoneValue.slice(0,-2);
		}

		// baseCheck('phone',phoneValue.length);
		if(phoneValue.length > 11 || !/^((4[89])|(5[0-7])|(9[6-9])|(10[0-5])|(34)|(8))$/.test(e.keyCode)){
			//prevent the length bigger than 11 or not Number input
			e.preventDefault();
		}
		else if(phoneValue.length === 11){
			
			if(/^1[3578]\d{9}$/.test(phoneValue)){
				//phone number is correct
				checkInfo.error = false;
				checkInfo.showError = false;
			}
			else{
				//phone number is error
				checkInfo.error = true;
				checkInfo.showError = true;
			}
			this.inputChange('phone',phoneValue,e,checkInfo);
		} 
		else{
			
			this.inputChange('phone',phoneValue,e,checkInfo);
		}
	}
	emailChange(e){
		let email = e.target.value,
			checkInfo = {
				showError:false,
				error:true
			};

		if(/^.+?@.+?\..+?/.test(email)){
			checkInfo.error = false;
			checkInfo.showError = false;
		}
		else{
			checkInfo.showError = true;
			checkInfo.error = true;
		}

		this.inputChange('email',e.target.value,e,checkInfo);

	}
	baseCheck(name,length){
		if(length === 0){
			this.setState({
				[name]:{
					showError:false,
					error:true
				}
			})
		}
	}
	hideComponent(e){	
		this.setState({
			promptDialog:{
				show:false
			}
		})
	}
	redirectToLogin(){
		this.props.history.push('/login');
	}
	registeBtnClick(){
		if(this.state.username.error){
			this.setState({
				promptDialog:{
					text:transLan('registe','error').username,
					show:true,
					onClick:function(){}
				}
			});
			return;
		}
		if(this.state.password.error){
			this.setState({
				promptDialog:{
					text:transLan('registe','error').password,
					show:true,
					onClick:function(){}
				}
			});
			return;
		}
		if(this.state.chpwdword.error||this.state.password.value!==this.state.chpwdword.value){
			this.setState({
				promptDialog:{
					text:transLan('registe','error').checkPwd,
					show:true,
					onClick:function(){}
				}
			});
			return;
		}
		if(this.state.phone.error){
			this.setState({
				promptDialog:{
					text:transLan('registe','error').phone,
					show:true,
					onClick:function(){}
				}
			});
			return;
		}
		if(this.state.email.error){
			this.setState({
				promptDialog:{
					text:transLan('registe','error').email,
					show:true,
					onClick:function(){}
				}
			});
			return;
		}
		let state = this.state;
		let data = {
			account:state.username.value,
			password:state.password.value,
			phone:state.phone.value,
			email:state.email.value
		}

		this.setState({
			normalBtnLoading:true
		});
		//请求后台
		utils.postFetch('/methods/registe.json',data)
		.then((res)=>{
			return res.json();
		})
		.then((data)=>{
			if(data&&data.status === 'err'){//如果注册失败
				if(data.result.owned){//用户名已存在
					this.setState({
						promptDialog:{
							text:transLan('registe','error').usernameExist,
							show:true,
							onClick:function(){}
						},
						normalBtnLoading:false
					});
				}
				else{//插入数据库失败
					this.setState({
						promptDialog:{
							text:transLan('registe','error').registeError,
							show:true,
							onClick:function(){}
						},
						normalBtnLoading:false
					});
				}
			}
			else if(data&&data.status === 'ok'){//注册成功
				this.setState({
					promptDialog:{
						text:transLan('registe','error').registeSuccess,
						show:true,
						onClick:this.redirectToLogin
					},
					normalBtnLoading:false
				});
			}
			else{//其他情况
				this.setState({
					promptDialog:{
						text:transLan('registe','error').networkError,
						show:true,
						onClick:function(){}
					},
					normalBtnLoading:false
				});
			}
		})
	}
	render(){
		let state = this.state;
		let promptDialog = this.state.promptDialog;
		return(
			<div>
				<div className = "IM-register">
					<img className = "IM-register-logo" src = { require("../../../static/registe.png") }  />
					<div className = "IM-register-area">
						<div className = "IM-register-info-area" style = {{textAlign:'left'}}>
							<label className = "IM-register-input-label">{transLan('registe','usrname')}</label>						
							<label className = "IM-register-input-label">{transLan('registe','password')}</label>						
							<label className = "IM-register-input-label">{transLan('registe','checkPwd')}</label>						
							<label className = "IM-register-input-label">{transLan('registe','phone')}</label>
							<label className = "IM-register-input-label">{transLan('registe','email')}</label>
						</div>
						
						<div className = "IM-register-info-area" style = {{width:'50%'}}>
							<InputBox className = "register" type = "text" onChange = {this.usrChange} valueInfo = {state.username} />						
							<InputBox className = "register" type = "password" onChange = {this.pwdChange} valueInfo = {state.password} />						
							<InputBox className = "register" type = "password" onChange = {this.chPwdChange} valueInfo = {state.chpwdword} />						
							<InputBox className = "register" type = "text" onKeyDown = {this.phoneChange} valueInfo = {state.phone} />
							<InputBox className = "register" type = "text" onChange = {this.emailChange} valueInfo = {state.email} />
						</div>
						<NormalButton onClick = {this.registeBtnClick} loading = {this.state.normalBtnLoading} value = {transLan('registe','registeButton')} />
						<br />
						<label style = {{float:'left',marginLeft:'50px'}} className = "IM-register-info-label">{transLan('registe','IMinfo')}</label>
						<Link style = {{float:'right'}} className = "IM-register-info-link" to = "/login">{transLan('registe','login')}</Link>
						<label style = {{float:'right'}} className = "IM-register-info-label">{transLan('registe','loginInfo')}</label>
					</div>
				</div>
				<PromptDialog hideComponent = {this.hideComponent} text = {promptDialog.text} show = {promptDialog.show} onClick = {promptDialog.onClick}></PromptDialog>
			</div>
		)
	}
}



export default Register;