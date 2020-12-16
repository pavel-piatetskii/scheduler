import axios from "axios";
import { useState, useEffect } from "react";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState(prev => ({ ...prev, day }))
  
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
  }, [state.day, state.refresh])

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const spotChange = (state.appointments[id].interview) ? 0 : 1;

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        state.days[state.days.findIndex(el => el.name === state.day)].spots -= spotChange;
        return setState({ ...state, appointments: appointments });
      })

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
      .then(() => {
        state.days[state.days.findIndex(el => el.name === state.day)].spots++;
        setState({ ...state, appointments: appointments })
      })
  };

  return { state, setDay, bookInterview, cancelInterview }
};