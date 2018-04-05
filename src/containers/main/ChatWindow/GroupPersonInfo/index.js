import React from 'react';
import './index.css';
import Portrait from '../../components/Portrait';

class GroupPersonInfo extends React.Component{

	constructor(props){
		super(props);
	}

	render(){
		let GroupChatPersons = this.props.persons.map((obj,index)=>{
			return (
				<div className = "IM-group-person" key = {index}>
					<Portrait src = {obj.headImg} headPopup = {true} id = {obj.id} />
					<br />
					<span>{obj.name}</span>
				</div>
			)
		})
		return (
			<div className = "IM-group-person-container">
				{GroupChatPersons}
			</div>
		)
	}
}

export default GroupPersonInfo;