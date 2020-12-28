import React from "react";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from 'hooks/useApplicationData'

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from 'components/Appointment'

/**
 * Top-level logic which handles the list of Days and 
 * the list of appointments for a day chosen
 */
export default function Application() {

  /**
   * State-handling reducer and related logic 
   * (including switching current day, adding / deleting an appointment)
   * are moved to a custom hook
   */
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  let dailyAppointments = getAppointmentsForDay(state, state.day);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">

        {dailyAppointments.map(app => {
          return <Appointment
            key={app.id} {...app}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
            interview={getInterview(state, app.interview)}
            interviewers={getInterviewersForDay(state, state.day)}
          />

        })}
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
};
