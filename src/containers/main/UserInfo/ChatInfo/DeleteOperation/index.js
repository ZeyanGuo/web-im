import React from 'react';
import './index.css';

class DeleteOperation extends React.Component{
	componentDidMount(){
		this.refs.deleteOperation.addEventListener('click',this.props.click);
	}
	componentWillUnmount(){
		this.refs.deleteOperation.removeEventListener('click',this.props.click);
	}
	render(){
		return (
			<div ref = "deleteOperation" className = "IM-delete-operation" style = {{top:this.props.y,left:this.props.x}} >
				关闭聊天
			</div>
		)
	}
}

export default DeleteOperation;