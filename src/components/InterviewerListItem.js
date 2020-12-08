import React from "react";
import "components/InterviewerListItem.scss";

const classNames = require('classnames');



export default function InterviewerListItem(props) {

  const { id, name, avatar, setInterviewer, selected } = props;

  const liClass = classNames('interviewers__item', {
    'interviewers__item--selected': selected,
  });

  const imgClass = classNames('interviewers__item-image', {
    'interviewers__item--selected-image': selected,
  });

  return (
    <li 
      className={liClass}
      key={id}
      onClick={setInterviewer}>
      <img
        className={imgClass}
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );

};