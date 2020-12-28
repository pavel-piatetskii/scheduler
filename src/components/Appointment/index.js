import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'
import Status from './Status'
import Confirm from './Confirm'
import Error from './Error'

import useVisualMode from 'hooks/useVisualMode'

/**
 * Main Appointment element. Depending on presence of the
 * appointment for a given timeslot, it will show 'Empty'
 * or 'Show' components. Also all logic to control any appointment
 * or to handle related errors is written here
 */
export default function Appointment(props) {

  // List of modes to 'turn on' necessary component for a given timeslot
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { interview, id, time, interviewers } = props;
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  /**
   * Save a new or edited appointment to the DB
   * If the interview was successfully saved, it will be shown
   * in the sheduler. Otherwise - the error message will appear.
   */
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING, true)
    props.bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
  };

  /**
   * Delete an existing appointment from the DB
   * If the intervie was successfully deleted, the 'Empty' component
   * will be shown in the sheduler. Otherwise - the error message will appear.
   */
  function destroy() {
    transition(DELETING, true);
    props.cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">   
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
      />)}
      {mode === EDIT && (
        <Form
          name={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
      />)}
      {mode === SAVING && (<Status message={'Saving'}/>)}
      {mode === DELETING && (<Status message={'Deleting'}/>)}
      {mode === CONFIRM && (
        <Confirm
          message={'This appointment will be deleted! Proceed?'}
          onCancel={() => back()}
          onConfirm={() => destroy()}
          />)}
      {(mode === ERROR_SAVE || mode === ERROR_DELETE) && (
        <Error
          message={`Could not ${(mode === ERROR_SAVE) ? 'save' : 'delete'} the appointment!`}
          onClose={() => back()}
        />)}

        
    </article>
  );
};

