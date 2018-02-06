import React from 'react';
import InputBox from '../../components/inputBox';
import transLan from '../../../static/zh-chan';
import './index.css';
import NormalButton from '../../components/NormalButton';
import {Link} from 'react-router-dom';




class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username:'',
			password:''
		};
		this.usrChange = this.usrChange.bind(this);
		this.pwdChange = this.pwdChange.bind(this);
		this.inputChange = this.inputChange.bind(this);
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
	render(){
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
					<NormalButton value = {transLan('login','loginButton')} />
					<br />
					<label style = {{float:'left',marginLeft:'50px'}} className = "IM-login-info-label">{transLan('login','IMinfo')}</label>
					<Link style = {{float:'right'}} className = "IM-login-info-link" to = "/register">{transLan('login','registe')}</Link>
					<label style = {{float:'right'}} className = "IM-login-info-label">{transLan('login','registeInfo')}</label>
					
				</div>
			</div>
		)
	}
}

export default Login;