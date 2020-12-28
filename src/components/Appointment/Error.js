import React from 'react';

/**
 * This component is shown if an attempt to Save, Edit or Delete
 * an appointment was unsuccessful for some reason.
 * An error message and function to 'close' this component are
 * passed as props
 */
export default function Error(props) {
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={props.onClose}
      />
    </main>
  )
}