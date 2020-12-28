import axios from "axios";
import { useEffect, useReducer } from "react";

  /**
   * State-handling reducer and related logic 
   * (including switching current day, adding / deleting an appointment)
   */
export default function useApplicationData() {

  const initialState = {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  }

  // Constants to be used within reducer switch...case
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";


  function reducer(state, action) {
    switch (action.type) {

      // Switch selected day in the day list
      case SET_DAY:
        return { ...state, day: action.day };

      // Update state with the new data
      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        };

      // Update a particular interview data within state
      case SET_INTERVIEW:
        const appointment = {
          ...state.appointments[action.id],
          interview: (action.interview && { ...action.interview }) || (action.interview)
        };
        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };
        return { ...state, appointments };

      // Change number of spots available for a given day
      case SET_SPOTS:
        const day = { ...state.days[action.index], spots: action.spots }
        return {
          ...state,
          days: state.days.map((el, i) => (i === action.index) ? day : el)
        }

      // If no constant above matched - throw error
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    };
  };

  // 
  const [state, dispatch] = useReducer(reducer, initialState);
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