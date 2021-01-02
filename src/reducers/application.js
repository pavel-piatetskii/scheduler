  // Constants to be used within reducer switch...case
  export const SET_DAY = "SET_DAY";
  export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  export const SET_INTERVIEW = "SET_INTERVIEW";
  export const SET_SPOTS = "SET_SPOTS";


  export default function reducer(state, action) {
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