import React from "react";
import Button from "components/Button";

export default function Confirm(props) {
    return (
        <main className="appointment__card appointment__card--confirm">
            <h1 className="text--semi-bold">Are You Sure You Want to Delete?</h1>
            <section className="appointment__actions">
                <Button danger onClick={props.onCancel}>Cancel</Button>
                <Button danger onClick={e => props.onConfirm(props.id)}>Confirm</Button>
            </section>
        </main>
    )
}