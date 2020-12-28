import React from 'react';
import Button from 'components/Button';

/**
 * When a user requests to delete an appointment, thiis confirmation
 * component is shown to prevent accidental deletions
 * actions for 'Cancel' and 'Confirm' buttons  as well as the conformatio message
 * are passed as props.
 */
export default function Confirm(props) {

  const { message, onCancel, onConfirm } = props;

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={onCancel}>Cancel</Button>
        <Button danger onClick={onConfirm}>Confirm</Button>
      </section>
    </main>
  )
}