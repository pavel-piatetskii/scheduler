import React from "react";
import "components/DayListItem.scss";

const classNames = require('classnames');


const formatSpots = function(spots) {

  const spotsNum = (spots) ? spots : 'no';
  const spotsWord = (spots === 1) ? ' spot' : ' spots';
  return spotsNum + spotsWord + ' remaining';

};

export default function DayListItem(props) {
  
  const { id, name, spots, onChange, selected } = props;
  const liClass = classNames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': !spots
  });


  return (
    <li className={liClass} onClick={onChange} key={id} data-testid="day">
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
};