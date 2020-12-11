import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from 'components/Appointment'


export default function Application(props) {
    
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });
  let dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = (day) => setState(prev => ({...prev, day }))

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    })
  },[state.day])

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
    .then(res => (res.status && res.status === 204) ? 
      setState({...state, appointments: appointments}) :
      console.log(`Error! Respond status: ${res.status}`))
    //.catch(err => console.log(err))
    
  };


  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`)
    .then(res => (res.status && res.status === 204) ? 
      setState({...state, appointments: appointments}) :
      console.log(`Error! Respond status: ${res.status}`))
    //.catch(err => console.log(err))
  };

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
        
        { dailyAppointments.map(app => {
          return <Appointment
            key={app.id} {...app}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
            interview = {getInterview(state, app.interview)}
            interviewers = {getInterviewersForDay(state, state.day)}
          />

        })}
        <Appointment key="last" time="5pm" />

      </section>
    </main>
  );
};
