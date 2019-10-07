import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList({days, day, setDay, spots}) {
    return days.map(day => {
        return (
          <DayListItem
            key={day.id}
            name={day.name}
            spots={day.spots}
            selected={day.name === day}
            setDay={setDay}
          />
        );
    });
}
