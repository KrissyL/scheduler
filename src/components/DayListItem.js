import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots < 1
  });

  function FormatSpots(spots) {
    let spotsText = "";
    
    if(props.spots === 1) {
      spotsText = "1 spot remaining"
    } else if(props.spots > 1) {
      spotsText = `${spots} spots remaining`
    } else {
      spotsText = "no spots remaining"
    }
    return spotsText
  }

  return (
    <li key={props.id} className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{FormatSpots(props.spots)}</h3>
    </li>
  );
}