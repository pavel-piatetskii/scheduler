import axios from "axios";
import { useEffect, useReducer } from "react";


export default function useApplicationData() {
  // const [state, setState] = useState({
  //   day: 'Monday',
  //   days: [],
  //   appointments: {},
  //   interviewers: {},
  // });

  const initialState = {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  }

  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

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
          interview: { ...action.interview }
        };
        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };
        return { ...state, appointments }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    };
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  //const setDay = (day) => setState(prev => ({ ...prev, day }))
  const setDay = (day) => dispatch({ type: SET_DAY, day })
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      // setState(prev => ({
      //   ...prev,
      //   days: all[0].data,
      //   appointments: all[1].data,
      //   interviewers: all[2].data
      // }));
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      })
    })
  }, [state.day, state.refresh])

  function bookInterview(id, interview) {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: { ...interview }
    // };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
    const spotChange = (state.appointments[id].interview) ? 0 : 1;

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        state.days[state.days.findIndex(el => el.name === state.day)].spots -= spotChange;
        //return setState({ ...state, appointments: appointments });
        return dispatch({ type: SET_INTERVIEW, id, interview })
      })

  };


  function cancelInterview(id) {
    //const appointment = {
    //  ...state.appointments[id],
    //  interview: null
    //};
    //const appointments = {
    //  ...state.appointments,
    //  [id]: appointment
    //};

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        state.days[state.days.findIndex(el => el.name === state.day)].spots++;
        //setState({ ...state, appointments: appointments })
        dispatch({ type: SET_INTERVIEW, id, interview: null })
      })
  };

  return { state, setDay, bookInterview, cancelInterview }
};