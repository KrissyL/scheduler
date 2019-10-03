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