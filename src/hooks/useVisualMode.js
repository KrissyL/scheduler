import React, { useState } from "react";

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

    function transition() {
        const next = "SECOND";
        history.push(next);
        setMode(next);
    }

    function back() {
        const after = "THIRD"
        const back = history.pop(after);
        setMode(back);
    }
  
    return { mode, transition, back };
  }