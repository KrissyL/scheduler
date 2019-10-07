import React from "react";
import "components/Appointments/index.scss";
import Header from "components/Appointments/Header";
import Form from "components/Appointments/Form";
import Show from "components/Appointments/Show";
import Empty from "components/Appointments/Empty";
import Status from "components/Appointments/Status";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "components/Appointments/Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {
    const { mode, transition, back } = useVisualMode(props.interview? SHOW: EMPTY);
    function onAdd() {
        transition(CREATE);
    };
    function onCancel() {
        back()
    };
    function save(name, interviewer) {
        const interview = {
            student: name,
            interviewer
        };
        transition(SAVING);
        props.bookInterview(props.id, interview);
        transition(SHOW);
      }
    function onDelete() {
        transition(CONFIRM);
    }
    function onConfirm(id) {
        transition(SAVING)
        props.cancelInterview(props.id)
        transition(EMPTY)
    }
    function onEdit() {
        transition(EDIT)
    }
    return (
    <article className="appointment">
        <Header time={props.time}/>
        {mode === EMPTY && <Empty onAdd={onAdd} />}
        {mode === SHOW && (
        <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={onDelete}
            onConfirm={onConfirm}
            onEdit={onEdit}
        />
        )}
        {mode === CREATE && <Form interviewers={props.interviewers} save={save} onCancel={onCancel} />}
        {mode === EDIT && <Form interviewers={props.interviewers} name={props.interview.student} interviewer={props.interview.interviewer.id} save={save} onCancel={onCancel} />}
        {mode === SAVING && <Status />}
        {mode === CONFIRM && <Confirm onConfirm={onConfirm} />}
    </article>
    )
}