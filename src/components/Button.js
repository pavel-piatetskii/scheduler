import React from "react";

import "components/Button.scss";
const classNames = require('classnames');

/**
 * The adjustable button component. 
 * Accepts styles, onClick functions and child-text as props
 */
export default function Button(props) {

	const { disabled, onClick, children, confirm ,danger } = props;

	const buttonClass = classNames('button', {
		" button--confirm": confirm,
		" button--danger": danger
	});

	return (
		<button
			disabled={disabled}
			className={buttonClass}
			onClick={onClick}
		>
			{children}
		</button>);
};
