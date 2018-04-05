import React from 'react';
import './index.css';
class HeadImgUpdatePopup extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		document.body.addEventListener('click',this.props.hideChangeHeadImg);
	}
	componentWillUnmount(){
		document.body.removeEventListener('click',this.props.hideChangeHeadImg);
	}
	render(){
		return (
			<iframe className = "IM-img-update" style = {{animation:"page-scale-in 0.5s ease-in-out forwards"}} src = "http://localhost:9000/staticHtml/headImg" />
		)
	}
}

export default HeadImgUpdatePopup;