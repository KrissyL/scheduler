import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
    const [name, setName] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const [error, setError] = useState("");
    
    function reset() {
      setName("");
      setInterviewer(null);
    }
    function onCancel() {
      reset();
      props.onCancel();
    }
    function validate(name, interviewer) {
      if (name === "") {
        setError("Student name cannot be blank");
        return;
      }
      setError("");
      props.save(name, interviewer);
    }
    return (
        <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off" onSubmit={event => event.preventDefault()}>
            <input
              className="appointment__create-input text--semi-bold"
              value={name}
              type="text"
              placeholder="Enter Student Name"
              onChange={event => setName(event.target.value)}
            />
          </form>
          <section className="appointment__validation">{error}</section>
          <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button danger onClick={e => onCancel()}>Cancel</Button>
            <Button confirm onClick={e => validate(name, interviewer)}>Save</Button>
          </section>
        </section>
      </main>
    )
}