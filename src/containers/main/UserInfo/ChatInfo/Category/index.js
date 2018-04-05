import React from 'react';
import './index.css';

const Category = (props) => {
	return (
		<div className = "IM-friends-category">
			<span>
				{props.cate}
			</span>
		</div>
	)
}

export default Category;