import React from 'react';

/**
 * Delimiter showing the time of the next appointment
 * The time is passed as a prop
 */
export default function Header(props) {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  )
}