import React from 'react';
import './index.css';

class Register extends React.Component{
	render(){
		return(
			<div className = "IM-register">
				<img className = "IM-register-logo" src = { require("../../../static/registe.png") }  />
			</div>
		)
	}
}

export default Register;