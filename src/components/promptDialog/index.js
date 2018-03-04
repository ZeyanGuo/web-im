import React from 'react';
import './index.css';
class PromptDialog extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			show:this.props.show
		}
		this.btnOnClick=this.btnOnClick.bind(this);
	}

	
	componentWillReceiveProps(nextProps){
		if(nextProps.show!==this.state.show){
			this.setState({
				show:nextProps.show
			});
		}
		else{
			return;
		}
	}

	btnOnClick(){
		this.props.hideComponent();
		this.props.onClick();
	}

	render(){
		return (
			<div className = "prompt-dialog" style = {{display:this.state.show?'block':'none',animation:this.state.show?'page-scale-in .5s ease-in-out forwards':'none'}}>
				<button onClick = {this.props.hideComponent} className = "prompt-dialog-close">X</button>
				<p className = "prompt-dialog-info">{this.props.text}</p>
				<button className = "prompt-dialog-btn" onClick = {this.btnOnClick}>确 认</button>
			</div>
		)
	}
}

export default PromptDialog;