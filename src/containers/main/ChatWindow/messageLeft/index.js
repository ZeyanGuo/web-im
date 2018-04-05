import React from 'react';
import './index.css';

const MessageRight = (props) => {
	return (
		<div className = "IM-message-left-container">
			<img className = "IM-message-left-headImg" src = {props.headImg?props.headImg:require('../../../../../static/noneImg.png')} />
			<p className = "IM-message-left-text">{props.value}</p>
		</div>
	)
}

export default MessageRight;