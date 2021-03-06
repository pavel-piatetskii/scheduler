import React from "react";
import "components/InterviewerListItem.scss";

const classNames = require('classnames');


/**
 * Interviewer componet for the list of interviewers. Gets name, image and
 * function to switch between interviewers from props
 */
export default function InterviewerListItem(props) {

  const { name, avatar, onChange, selected } = props;

  const liClass = classNames('interviewers__item', {
    'interviewers__item--selected': selected,
  });

  const imgClass = classNames('interviewers__item-image', {
    'interviewers__item--selected-image': selected,
  });

  return (
    <li className={liClass} onClick={onChange}>
      <img
        className={imgClass}
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );

};