import React from 'react';
import 'index.css';
class Main extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className = "IM-main">
				<UserInfo></UserInfo>
				<ChatWindow></ChatWindow>
			</div>
		);
	}
}

export default Main