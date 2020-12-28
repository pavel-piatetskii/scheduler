import React from 'react';

/**
 * This component appears if noo appointment is set for a given time
 */
export default function Empty(props) {
  return (
  <main className="appointment__add">
    <img
      className="appointment__add-button"
      src="images/add.png"
      alt="Add"
      onClick={props.onAdd}
    />
  </main>
  )
}