import { useEffect, useReducer } from "react";
import axios from 'axios';
import { getAppointmentsForDay } from "helpers/selectors";
import reduceState from "reducer/application";

export default function useApplicationData() {

  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }
  
  const [state, dispatchState] = useReducer(
    reduceState,
    initialState
  )
  
  function setDay(day) {
    dispatchState({value: day, type: "setDay"})
  }

  function getSpots(day) {
    let spots = [];
    const appointmentsPerDay = getAppointmentsForDay(state, day);

    spots = appointmentsPerDay.filter(appointment => appointment.interview === null);

    return spots.length;
  };

  async function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    try {
      await axios.put(`/api/appointments/${id}`, { interview });
      dispatchState({ value: appointments, type: "setAppointment" });
    }
    catch (err) {
      throw err;
    }
  };

  async function cancelInterview(id) {
    const appointment = {
        ...state.appointments[id],
        interview: null
        };
        const appointments = {
        ...state.appointments,
        [id]: appointment
        };
    try {
      await axios.delete(`/api/appointments/${id}`);
      dispatchState({ value: appointments, type: "setAppointment" });
    }
    catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {
      dispatchState({value: { days: all[0].data, appointments: all[1].data, interviewers: all[2].data }, type: "setAll" });
    }).catch(err => {throw err});
  }, [state.appointments]);
  return { state, setDay, bookInterview, cancelInterview, getSpots }
};
