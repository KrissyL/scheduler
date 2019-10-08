import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/Daylist";
import Appointment from "components/Appointments/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
// import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments})
    axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(() => {setState({...state, appointments})})
    .then(() => {getSpots(state.day)})
    .catch(err => {return err});
  }
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments})
    axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {setState({...state, appointments})})
    .catch(err => {return err}); 
  }
const interviewers = getInterviewersForDay(state, state.day);


function getSpots(day) {
      let spots = [];
      const appointmentsPerDay = getAppointmentsForDay(state, day);
  
      spots = appointmentsPerDay.filter(appointment => appointment.interview === null);
  
      return spots.length;
    };

const schedule = getAppointmentsForDay(state, state.day).map(
  appointment => {
  return (
    <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={getInterview(state, appointment.interview)}
      interviewers={interviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
    />
  )
});

  useEffect(() => {
    // axios.get("http://localhost:8001/api/days").then(response => setDays(response.data));
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    }).catch(err => {return err});
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
        {
          <>
          <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />        
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
          useState={useState}
          getSpots={getSpots}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        </>
        }
      </section>
      <section className="schedule">
          {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}