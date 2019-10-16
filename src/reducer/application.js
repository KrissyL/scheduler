const stateLookup = {
    setDay: (state, value) => {
      return {...state, day: value}
    },
    setDays: (state, value) => {
      return {...state, days: value}
    },
    setAppointment: (state, value) => {
      return {...state, appointments: value}
    },
    setAll: (state, value) => {
      return {...state, ...value}
    }
}

export default function reduceState (state, action) {
    if (stateLookup[action.type]) return stateLookup[action.type](state, action.value);
    throw new Error("Cannot reduce. Unsupported action type");
};