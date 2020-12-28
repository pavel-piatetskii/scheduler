/**
 * Extract a list of appointnent for a given day
 */
export function getAppointmentsForDay(state, day) {
  const dayFiltered = (Array.isArray(state.days) && state.days.filter(el => el.name === day)) || [];
  if (dayFiltered.length === 0) return [];

  const appsForDay = dayFiltered[0].appointments;
  if ( !appsForDay || appsForDay.length === 0) return [];

  return appsForDay.map(el => state.appointments[el]);
}

/**
 * Extract a specific interview from a state object
 */
export function getInterview(state, interview) {
  return (
    interview && {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }) || null;
}

/**
 * Extract a list of interviews for a given day
 */
export function getInterviewersForDay(state, day) {
  const dayFiltered = (Array.isArray(state.days) && state.days.filter(el => el.name === day)) || [];
  if (dayFiltered.length === 0) return [];

  const intsForDay = dayFiltered[0].interviewers;
  if ( !intsForDay || intsForDay.length === 0) return [];

  return intsForDay.map(el => state.interviewers[el]);
};