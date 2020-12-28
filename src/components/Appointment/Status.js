import React from 'react';

/**
 * The component which shows a status message, passed as prop, when
 * an appointment is being saved or deleted
 */
export default function Status(props) {
  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  )
}