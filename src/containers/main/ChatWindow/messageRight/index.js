import React from 'react';
import './index.css';

const MessageRight = (props) => {
	return (
		<div className = "IM-message-right-container">
			<img style = {{display:props.error?'inline':'none'}} src = {require('../../../../../static/loading-error.png')} className = "IM-message-right-error" />
			<img style = {{display:props.wating?'inline':'none'}} src = {require('../../../../../static/loading-message.png')} className = "IM-message-right-loading" />
			<p className = "IM-message-right-text">{props.value}</p>
			<img className = "IM-message-right-headImg" src = {props.headImg?props.headImg:require('../../../../../static/noneImg.png')} />
		</div>
	)
}

export default MessageRight;