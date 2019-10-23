import { useState } from "react";

// set the visual state of interviews
export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

    function transition(nextMode, replace = false) {
        if (!replace) {
            setHistory([...history, nextMode]);
        }
        setMode(nextMode);
    }
    
    function back() {
        if(history.length > 1) {
          const newHistory = history.splice(0, history.length - 1);
          setHistory(newHistory);
          setMode(newHistory[newHistory.length - 1]);
        }
      }
  
    return { mode, transition, back };
  }