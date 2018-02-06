import React from 'react';
import './index.css';



const InputBox = (props) => {
	let className = 'inputBox-style';
	props.className === 'register'? className += ' input-register':'';
	// if(props.error){debugger; console.log(props.error)}
	if(props.className === 'register'){
		props.valueInfo.showError?className += ' error':'';
		!props.valueInfo.error?className += ' correct':'';
	}
	return (
		<input 
			type = {props.type} 
			onChange = {props.onChange}
			onKeyDown = {props.onKeyDown} 
			value = {props.className === 'register'?props.valueInfo.value:props.value}
			className = {className} />
	)
}

export default InputBox;