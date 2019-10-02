import React from "react";
import "components/Appointments/index.scss";
import Header from "components/Appointments/Header";
import Show from "components/Appointments/Show";
import Empty from "components/Appointments/Empty";

export default function Appointment(props) {
    const conditionalRender = (props.interview)? <Show {...props.interview} />: <Empty />;
    return (
    <article className="appointment">
        <Header time={props.time}/>
        {conditionalRender}
    </article>
    )
}