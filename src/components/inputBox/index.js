import React from 'react';

const style = {
	marginTop: '12px',
    height: '30px',
    width: '50%',
    fontSize: '20px',
    color: 'gray',
    border: '0px',
    borderBottom: '1px solid gray',
    outline: 'none'
}

const InputBox = (props) => {
	return (
		<input 
			style = {style}
			type = {props.type} 
			onChange = {props.onChange} 
			value = {props.value} />
	)
}

export default InputBox;