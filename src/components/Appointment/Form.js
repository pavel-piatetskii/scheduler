import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';


/**
 * Form where an appointment can be created or edited.
 * Receive student name (name) and interviewer name (interviewer)
 * as props only if an appointment for a given timeslot exists.
 * @param {*} props 
 */
export default function Form(props) {

  const { interviewers, onCancel, onSave } = props;

  const [name, setName] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');

  function reset() {
    setName('');
    setInterviewer(null);
  };

  function cancel() {
    reset();
    onCancel();
  };
  

  /**
   * Check that a user entered a student name
   * and chose an interviewer from the list
   * show an appropriate error message if not
   */
  function validate() {
    if (name === '') {
      return setError('Student name cannot be blank');
    }
    if (!interviewer) {
      return setError('You should choose interviewer!');
    }

    // If an error message was shown before, clean it
    setError('');
    onSave(name, interviewer);
  };


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={(e) => setName(e.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={() => cancel()}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  )
}