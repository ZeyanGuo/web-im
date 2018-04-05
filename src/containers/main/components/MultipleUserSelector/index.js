import React from 'react';
import './index.css';
import config from '../../../../config.js';
class MultipleUserSelector extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className = "IM-group-chat-user" data-index = {this.props.index} data-id = {this.props.id} style = {{background:this.props.selectNow?'#f9f9f9':'transparent'}}>
				<div className = "IM-group-chat-user-check">
					<i style = {{backgroundImage:this.props.selected?"url('"+config.local+"/images/ok.png')":''}}></i>
				</div>
				<div className = "IM-group-chat-user-avatar">
					<img src = {this.props.headImg?this.props.headImg:require('../../../../../static/noneImg.png')} />
				</div>
				<div className = "IM-group-chat-user-name">
					<span>{this.props.userName}</span>
				</div>
			</div>
		)
	}
}

export default MultipleUserSelector;