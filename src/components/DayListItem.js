import React from "react";
import "components/DayListItem.scss";

const classNames = require('classnames');

/**
* Format the text describing number of available spots as
* no spots / 1 spot / 2 spots...
 */
const formatSpots = function(spots) {

  const spotsNum = (spots) ? spots : 'no';
  const spotsWord = (spots === 1) ? ' spot' : ' spots';
  return spotsNum + spotsWord + ' remaining';

};

/**
 * Day componet for the list of days. Gets day name, available spots and
 * function to switch between days from props
 */
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