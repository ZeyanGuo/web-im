import React from 'react';
import './index.css';
import {connect} from 'react-redux';
import actions from '../../../../redux/actions.js';
import utils from '../../../../utils';
 class UserInfoPopup extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			firstShow:true,
			height:0,
			headImg:'',
			name:'',
			gender:'male',
		}
		this.cache = {};
		this.hideComponent = this.hideComponent.bind(this);
		this.showUserInfoPopup = this.showUserInfoPopup.bind(this);
	}
	preventPropagation(e){
		e.stopPropagation();
	}
	hideComponent(){
		//add the close animation
		this.props.hideUserInfo();
	}
	showUserInfoPopup(){
		this.props.showUserInfoPopup();

	}
	componentWillReceiveProps(nextProps){
		
		if(!!nextProps.id&&!!nextProps.userid&&(nextProps.id === nextProps.userid)){
			this.setState({
				headImg:this.props.baseInfo.headImg,
				gender:this.props.baseInfo.gender,
				name:this.props.baseInfo.name
			})
		}
		else{
			if(!!nextProps.id){
				if(!!this.cache[nextProps.id]){
					let id = nextProps.id;
					this.setState({
						headImg:this.cache[id].headImg,
						gender:this.cache[id].gender,
						name:this.cache[id].name
					});
				}
				else{
					utils.getFetch('/methods/getUserById.json?id='+nextProps.id)
					.then((res)=>{
					   return res.json();
					})
					.then((data)=>{
						this.setState({
							headImg:data.baseInfo.headImg,
							gender:data.baseInfo.gender,
							name:data.baseInfo.name,
						});
						this.cache[nextProps.id] = {
							headImg:data.baseInfo.headImg,
							gender:data.baseInfo.gender,
							name:data.baseInfo.name
						}
					})
				}
			}
		}
	}
	componentDidMount(){
		document.body.addEventListener('click',this.hideComponent);
		document.getElementsByClassName('IM-main-popup-btn')[0].addEventListener('click',this.showUserInfoPopup)
		document.getElementsByClassName('IM-main-popup')[0].addEventListener('click',this.preventPropagation);
		window.addEventListener('resize',()=>{
			this.setState({
				height:window.innerHeight
			});
		});
		setTimeout(()=>{
			this.setState({
				firstShow:false,
				height:window.innerHeight
			});
		},200);
	}
	componentWillUnMount(){
		document.body.removeEventListener('click',this.hideComponent);
		document.getElementsByClassName('IM-main-popup-btn')[0].removeEventListener('click',this.showUserInfoPopup)
		document.getElementsByClassName('IM-main-popup')[0].removeEventListener('click',this.preventPropagation);
        //重写组件的setState方法，直接返回空
        this.setState = (state,callback)=>{
          return;
        };  
	}
	render(){
		let female = <svg className="IM-popup-gender" style={{fill:'#ef565b'}} aria-hidden="true"><use xlinkHref="#icon-female"></use></svg>,
			male = <svg className="IM-popup-gender" style={{fill:'#43a7cd'}} aria-hidden="true"><use xlinkHref="#icon-man"></use></svg>,
			plus = <svg className="IM-popup-plus" aria-hidden="true"><use xlinkHref="#icon-plus"></use></svg>,
			X = this.props.position.X,
			Y = this.props.position.Y;
		if(Y + 280 > this.state.height){
			Y = this.state.height - 280;
		}
		return (
			<div style={{
				zIndex:!this.state.firstShow?'10':'-1',
				animation:!this.state.firstShow&&this.props.show?'page-scale-in .15s ease-in-out forwards':'page-scale-out .15s ease-in-out forwards',
				top: !this.state.firstShow?Y+'px':'50%',
				left: !this.state.firstShow?X+'px':'50%'}} className = "IM-main-popup">
				<img className = "IM-popup-portrait" src={this.state.headImg?this.state.headImg:require('../../../../../static/noneImg.png')} />
				<div>
					<div className = "IM-popup-info-content">
						<div className = "IM-popup-info-base">
							<span className = "L">{this.state.name}</span>
							{this.state.gender === 'male'?male:female}
							<button className = "IM-main-popup-btn" style={{display:this.props.id === this.props.userid?'block':'none'}} >修改</button>

						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (State) => {
	let popupDialog = State.mainReducer.popupDialog;
	return {
		id:popupDialog.id,
		position:{
			X:popupDialog.position.X,
			Y:popupDialog.position.Y,
		},
		show:popupDialog.show,
		userid:State.loginReducer.userInfo.id,
		baseInfo:State.loginReducer.userInfo.baseInfo
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		hideUserInfo:(info)=>{dispatch(actions.hideUserInfo(info))},
		showUserInfoPopup:()=>{dispatch(actions.showBaseInfoPopup())}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(UserInfoPopup);






