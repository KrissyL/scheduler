import React from "react";
import "components/Appointments/index.scss";
import Header from "components/Appointments/Header";
import Form from "components/Appointments/Form";
import Show from "components/Appointments/Show";
import Empty from "components/Appointments/Empty";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Appointment(props) {
    const { mode, transition, back } = useVisualMode(props.interview? SHOW: EMPTY);
    function onAdd() {
        transition(CREATE);
    };
    function onCancel() {
        back()
    };
    return (
    <article className="appointment">
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={onAdd} />}
        {mode === SHOW && (
        <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
        />
        )}
        {mode === CREATE && <Form interviewers={props.interviewers} onCancel={onCancel} />}
    </article>
    )
}