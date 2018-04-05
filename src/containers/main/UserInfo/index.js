import React from 'react';
import './index.css';
import PersonInfo from './PersonInfo';
import Search from './Search';
import ChatInfo from './ChatInfo';

class UserInfo extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className = "IM-main-user-info">
				<PersonInfo />
				<Search />
				<ChatInfo />
			</div>
		)
	}
}

export default UserInfo;