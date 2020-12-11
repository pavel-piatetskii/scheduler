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


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true)
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
  };

  function destroy() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
      />)}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
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

