import React from 'react';
import actions from '../../../../redux/actions.js';
import './index.css'
import {connect} from 'react-redux';

class Portrait extends React.Component{
	constructor(props){
		super(props);
		this.showUserInfo = this.showUserInfo.bind(this);
	}
	showUserInfo(e){
		let x = e.clientX;
		let y = e.clientY;
		setTimeout(()=>{
			this.props.showUserInfo({id:this.props.id,mouseX:x,mouseY:y});
		},200);
		
	}
	render(){
		return(
			<img src = {this.props.src?this.props.src:require('../../../../../static/noneImg.png')} onClick = {this.props.headPopup?this.showUserInfo:()=>{}} className = "IM-portrait"></img>
		)
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		showUserInfo:(info)=>{dispatch(actions.showUserInfo(info))}
	}
}


export default connect(null,mapDispatchToProps)(Portrait);