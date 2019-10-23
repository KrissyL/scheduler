// finds the appointments for each day of the week
export function getAppointmentsForDay(state, day) {
    const apptArray = [];
    const dayKey = state.days.find(result => {
      return result.name === day
    });
    if (!dayKey) return apptArray;
  
    for (const appt of dayKey.appointments) {
      if (state.appointments[appt]) {
        apptArray.push(state.appointments[appt])
      }
    }
    return apptArray;
  };

// returns a specific interview
export function getInterview(state, interview) {
  if (interview && state) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    } 
  } else {
    return null;
  }
}
// gets available interviewers for each day
export function getInterviewersForDay(state, day) {
  const interviewerArray = [];
  const dayKey = state.days.find(result => {
    return result.name === day
  });
  if (!dayKey) return interviewerArray;
  
  for (const int of dayKey.interviewers) {
    if (state.interviewers[int]) {
      interviewerArray.push(state.interviewers[int])
    }
  }
  return interviewerArray;
};