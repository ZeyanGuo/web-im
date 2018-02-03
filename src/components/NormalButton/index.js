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
}

const NormalButton = (props) => {
	return (
		<button style={style} className = 'IM-normal-button' >{props.value}</button>
	)
}


export default NormalButton;