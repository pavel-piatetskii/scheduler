import axios from "axios";
import { useEffect, useReducer } from "react";


export default function useApplicationData() {

  const initialState = {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  }

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_SPOTS = "SET_SPOTS";

  function reducer(state, action) {
    switch (action.type) {

      case SET_DAY:
        return { ...state, day: action.day };

      case SET_APPLICATION_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        };

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

      case SET_SPOTS:
        const day = { ...state.days[action.index], spots: action.spots }
        return {
          ...state,
          days: state.days.map((el, i) => (i === action.index) ? day : el)
        }

      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    };
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const setDay = (day) => dispatch({ type: SET_DAY, day })
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