import React from 'react';
import './index.css';
import Portrait from '../../components/Portrait';
import {connect} from 'react-redux';
import MoreOperation from './MoreOperation';
class PersonInfo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showMoreOperation:false
		}
		this.showMoreOperation = this.showMoreOperation.bind(this);
		this.hideMoreOperation = this.hideMoreOperation.bind(this);
	}
	showMoreOperation(){
		this.setState({
			showMoreOperation:true
		})
	}
	hideMoreOperation(){
		this.setState({
			showMoreOperation:false
		})
	}
	render(){
		let headImg = this.props.baseInfo&&this.props.baseInfo.headImg;
		return(
			<div style = {{verticalAlign:'bottom'}} className = "IM-main-user-container">

				<Portrait src = {headImg} id = {this.props.id} headPopup = {true} />
				<label className = "IM-main-user-name">
					{this.props.baseInfo?this.props.baseInfo.name:''}
				</label>
				<svg className="IM-main-user-more" onClick = {this.showMoreOperation} aria-hidden="true">
				  <use xlinkHref="#icon-more"></use>
				</svg>
 	 			{this.state.showMoreOperation?<MoreOperation hideComponent = {this.hideMoreOperation}/>:''}
			</div>
		)
	}
}

const mapStoreToProps = (Store)=>{
	return {
		baseInfo:Store.loginReducer.userInfo.baseInfo,
		id:Store.loginReducer.userInfo.id
	}
}

export default connect(mapStoreToProps)(PersonInfo);