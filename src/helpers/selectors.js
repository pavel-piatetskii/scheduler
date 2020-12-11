export function getAppointmentsForDay(state, day) {
  const dayFiltered = (Array.isArray(state.days) && state.days.filter(el => el.name === day)) || [];
  if (dayFiltered.length === 0) return [];

  const appsForDay = dayFiltered[0].appointments;
  if ( !appsForDay || appsForDay.length === 0) return [];

  return appsForDay.map(el => state.appointments[el]);
}


export function getInterview(state, interview) {
  return (
    interview && {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }) || null;
}


export function getInterviewersForDay(state, day) {
  const dayFiltered = (Array.isArray(state.days) && state.days.filter(el => el.name === day)) || [];
  if (dayFiltered.length === 0) return [];

  const intsForDay = dayFiltered[0].interviewers;
  if ( !intsForDay || intsForDay.length === 0) return [];

  return intsForDay.map(el => state.interviewers[el]);
};