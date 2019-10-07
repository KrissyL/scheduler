// import React, { useEffect, useReducer } from "react";
// import axios from 'axios';
// import { getAppointmentsForDay } from "helpers/selectors";

// export default function useApplicationData() {

//   const stateLookup = {
//     day: (state, value) => {
//       return { ...state, day: value };
//     },
//     days: (state, value) => {
//       return { ...state, days: value };
//     },
//     appointments: (state, value) => {
//       return { ...state, appointments: value };
//     },
//     appointment: (state, value) => {
//       const newAppointment = {...(state.appointments[value.id] || {}), ...value};
//       const appointments = {...state.appointments, [value.id]: newAppointment};
//       return { ...state, appointments };
//     },
//     interviewers: (state, value) => {
//       return { ...state, interviewers: value };
//     },
//     all: (state, value) => {
//       return { ...state, ...value }
//     }
//   };

//   function reduceState(state, action) {
//     return stateLookup[action.type](state, action.value) || state;
//   };

//   let [state, dispatchState] = useReducer(reduceState, {
//     day: "Monday",
//     days: [],
//     appointments: {},
//     interviewers: { name: 'hello' },
//   });

//   function getSpots(day) {
//     let spots = [];
//     const appointmentsPerDay = getAppointmentsForDay(state, day);

//     spots = appointmentsPerDay.filter(appointment => appointment.interview === null);

//     return spots.length;
//   };

//   function bookInterview(id, interview) {
//     const appointment = {
//       ...state.appointments[id],
//       interview: { ...interview }
//     };
//     const appointments = {
//       ...state.appointments,
//       [id]: appointment
//     };
//     return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
//     .then(() => {dispatchState({value: appointment, type: "appointments"})})
//     .catch(err => {return err});
//   };

//   function cancelInterview(id) {
//     const appointment = {
//         ...state.appointments[id],
//         interview: null
//         };
//         const appointments = {
//         ...state.appointments,
//         [id]: appointment
//         };
//     return axios.delete(`http://localhost:8001/api/appointments/${id}`)
//     .then(() => {dispatchState({value: appointment, type: "appointments"})})
//     .catch(err => {return err});
//   }

//   useEffect(() => {
//     Promise.all([
//       axios.get("http://localhost:8001/api/days"),
//       axios.get("http://localhost:8001/api/appointments"),
//       axios.get("http://localhost:8001/api/interviewers")
//     ]).then(all => {
//       const value = { days: all[0].data, appointments: all[1].data, interviewers: all[2].data };
//       dispatchState({ value, type: "all" });
//     })
//   }, []);
//   return { state, dispatchState, bookInterview, cancelInterview, getSpots }
// };
