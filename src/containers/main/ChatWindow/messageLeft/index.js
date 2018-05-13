import React from 'react';
import './index.css';

const MessageRight = (props) => {
	let showComponent;
	if(props.msgType == 'text'){
		showComponent = <p className = "IM-message-left-text">{props.value}</p>;
	}
	else if(props.msgType == 'image'){
		showComponent = <p className = "IM-message-left-text"><img  src = {props.value} /></p>;
	}
	return (
		<div className = "IM-message-left-container">
			<img className = "IM-message-left-headImg" src = {props.headImg?props.headImg:require('../../../../../static/noneImg.png')} />
			{showComponent}
		</div>
	)
}

export default MessageRight;