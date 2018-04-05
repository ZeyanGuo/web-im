import React from 'react';
import './index.css'
import Chat from '../../ChatInfo/Chat';
import Category from '../../ChatInfo/Category';
class SearchFriendList extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showIndex:null
		}
		this.childSelectAndStopPropagation = this.childSelectAndStopPropagation.bind(this);
	}
	childSelectAndStopPropagation(e){
		e.stopPropagation();
		let target = e.target;
		if(target.tagName == 'IMG'){
			target = target.parentElement;
		}
		else if(target.tagName == 'P'){
			target = target.parentElement.parentElement;
		}
		if(target.getAttribute('class') == 'IM-chat-main'){
			this.setState({
				showIndex:target.getAttribute('data-index')
			})
		}
	}
	componentDidMount(){
		document.getElementsByClassName('IM-search-friend-list')[0].addEventListener('click',this.childSelectAndStopPropagation);
		document.body.addEventListener('click',this.props.hideComponent);
	}
	componentWillUnmount(){
		document.body.removeEventListener('click',this.props.hideComponent);
		document.getElementsByClassName('IM-search-friend-list')[0].removeEventListener('click',this.childSelectAndStopPropagation);	
	}
	render(){
		let peoples = this.props.peoples,
			showIndex = this.state.showIndex;
		let chats = peoples.map((obj,index) => {
			let selected = false;
			if(index == showIndex){
				selected = true;	
			}
			return <Chat fontSize = "32.5px" info = {obj} headPopup = {false} key = {index} type = {3} index = {index} selected = {selected} />
		});
		return (
			<div className = "IM-search-friend-list">
				<Category cate = "搜索结果" />
				{this.props.peoples.length === 0?<p className = "IM-search-no-result">找不到匹配的结果</p>:''}
				{chats}
			</div>
		)
	}
}

export default SearchFriendList;