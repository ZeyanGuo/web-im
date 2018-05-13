import React from 'react';
import './index.css';
import emojis from '../../../../../static/emoji';

class EmojiContainer extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let emojisObj = emojis.map((obj,index)=>{
			return <i key = {index} data-index = {index}>{obj}</i>
		})
		return (
			<div ref = "emojiContainer" onClick = {this.props.click} style = {{display:this.props.show?"block":"none"}} className = "IM-Emoji-Container">
				{emojisObj}
			</div>
		)
	}
}

export default EmojiContainer;