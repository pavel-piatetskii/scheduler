import axios from "axios";
import { useEffect, useReducer } from "react";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_SPOTS
} from "reducers/application"

/**
 * State-handling reducer and related logic 
 * (including switching current day, adding / deleting an appointment)
 */
export default function useApplicationData() {

  // Declare a reducer usage with Monday the initial day
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => dispatch({ type: SET_DAY, day });

  // Request data for days, appointments and interviews
  // when other day is selected, then pass the data to reducer
  // to update the state
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      })
    })
  }, [state.day])

  /**
   * Book new interview or edit an existing one:
   * 1. Send appointment data to the DB
   * 2. On success set new available spots number
   * 3. Send new interview and spots data to the reducer to update the state
   */
  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const spotsChange = (state.appointments[id].interview) ? 0 : 1;
        const index = state.days.findIndex(el => el.name === state.day)
        const spots = state.days[index].spots - spotsChange;

        dispatch({ type: SET_INTERVIEW, id, interview })
        dispatch({ type: SET_SPOTS, spots, index })
      })

  };

  /**
   * Book new interview or edit an existing one:
   * 1. Send request to the DB to delete the appointment
   * 2. On success set new available spots number
   * 3. Send new interview and spots data to the reducer to update the state
   */
  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const index = state.days.findIndex(el => el.name === state.day)
        const spots = state.days[index].spots + 1;

        dispatch({ type: SET_INTERVIEW, id, interview: null })
        dispatch({ type: SET_SPOTS, spots, index })
      })
  };

  return { state, setDay, bookInterview, cancelInterview }
};