export function getAppointmentsForDay(state, day) {
    let dayKey = state.days.find(result => result.name === day);
    const apptArray = [];
    if (!dayKey) return [];
  
    const appointments = dayKey.appointments;
    appointments.map(appointment => {
      if (state.appointments[appointment]) {
        apptArray.push(state.appointments[appointment]);
      }
    });
    return apptArray;
  };

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

export function getInterviewersForDay(state, day) {
  let dayKey = state.days.find(result => result.name === day);
  const interviewerArray = [];
  if (!dayKey) return [];

  const interviewers = dayKey.interviewers;
  interviewers.map(interviewer => {
    if(state.interviewers[interviewer]) {
      interviewerArray.push(state.interviewers[interviewer]);
    }
  })    
  return interviewerArray;
};