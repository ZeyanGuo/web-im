import React from 'react';


class ComfireDialog extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			showComponent:true
		}
		this.hideComponent = this.hideComponent.bind(this);
		
	}
	hideComponent(){
		//add the close animation
		this.setState({
			showComponent:false
		})
	}
	componentDidMount(){
		document.body.addEventListener('click',this.hideComponent);
	}
	componentWillUnMount(){
		document.body.removeEventListener('click',this.hideComponent);
	}

	render(){
		if(this.state.showComponent){
			return (
				<div>
					<header>
						<p>{props.showInfo.head}</p>
					</header>
					<div>
						<p>{props.showInfo.text}</p>
					</div>
					<footer>
						<button>
							{props.showInfo.ok}
						</button>
					</footer>
				</div>
			)
		}else{
			return;
		}
	}
}