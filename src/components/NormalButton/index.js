import React from 'react';
import './index.css';

let style = {
	marginTop: '25px',
	padding: '.3em 3.7em',
	wordSpacing: '.3em',
	textAlign:'center',	
    outline: 'none',    
    fontSize: '25px',
    color: 'gray',
    lineHeight: '25px',
    borderRadius: '5px',
    transition: 'background .3s ease-in',
    width:'250px'
}

const NormalButton = (props) => {
	return (
		<button style={style} onClick = {props.onClick} className = 'IM-normal-button' >
			<label style={{display:props.loading?'none':'block'}}>{props.value}</label>
			<img src={require("../../../static/loading.png")} className = 'IM-normal-loading' style = {{display:props.loading?'block':'none'}}></img>
		</button>
	)
}


export default NormalButton;