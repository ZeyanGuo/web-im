import React from 'react';
import {connect} from 'react-redux';
import './index.css';

class MainMask extends React.Component{
	constructor(props){
		super(props)
		this.preventDefault = this.preventDefault.bind(this);
	}
	preventDefault(e){
		e.preventDefault();
	}
	componentDidMount(){
		document.getElementsByClassName('IM-mask')[0].addEventListener('click',this.preventDefault);
	}
	componentWillUmmount(){
		document.getElementsByClassName('IM-mask')[0].removeEventListener('click',this.preventDefault);
	}
	render(){
		let show = this.props.baseInfo&&this.props.baseInfo.hasBaseInfo;
		return (
			<div className = "IM-mask" style = {{display:!show}}>

			</div>
		)
	}
}

const mapStoreToProps = (store) => {
	return {
		baseInfo:store.loginReducer.userInfo.baseInfo
	}
}

export default connect(mapStoreToProps)(MainMask);