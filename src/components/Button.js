import React from "react";

import "components/Button.scss";
const classNames = require('classnames');

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
