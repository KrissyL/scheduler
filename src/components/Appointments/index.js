import React from "react";
import "components/Appointments/index.scss";
import Header from "components/Appointments/Header";
import Form from "components/Appointments/Form";
import Show from "components/Appointments/Show";
import Empty from "components/Appointments/Empty";
import Status from "components/Appointments/Status";
import Error from "components/Appointments/Error";
import useVisualMode from "hooks/useVisualMode";
import Confirm from "components/Appointments/Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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
            interviewer: interviewer
        };
        if (interview.student && interview.interviewer) {
            transition(SAVING);
            props.bookInterview(props.id, interview)
            .then(() => {
                transition(SHOW)
            })
            .catch(err => transition(ERROR_SAVE));
        } else {
            transition(ERROR_SAVE)
        }
    }

    function onConfirm(id) {
        transition(DELETING);
        props.cancelInterview(props.id)
        .then(() => {
            transition(EMPTY)
        })
        .catch(err => transition(ERROR_DELETE, true));
    }

    function onClose() {
        back()
        back()
    }

    return (
        <article className="appointment"  data-testid="appointment">
            <Header time={props.time}/>
            {mode === EMPTY && <Empty onAdd={onAdd} />}
            {mode === SHOW && props.interview && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer}
                    onDelete={() => transition(CONFIRM)}
                    onEdit={() => transition(EDIT)}
                />
            )}
            {mode === CREATE && <Form interviewers={props.interviewers} save={save} onCancel={onCancel} />}
            {mode === EDIT && <Form interviewers={props.interviewers} name={props.interview.student} interviewer={props.interview.interviewer.id} save={save} onCancel={onCancel} />}
            {mode === SAVING && <Status statusMessage={"Saving"} />}
            {mode === DELETING && <Status statusMessage={"Deleting"} />}
            {mode === CONFIRM && <Confirm onConfirm={onConfirm} />}
            {mode === ERROR_SAVE && <Error errorMessage="Could Not Book Appointment" onClose={onClose} />}
            {mode === ERROR_DELETE && <Error errorMessage="Could Not Delete Appointment" onClose={onClose} />}
        </article>
    )
}