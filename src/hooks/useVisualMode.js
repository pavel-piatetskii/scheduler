import { useEffect, useState } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  useEffect(() => {
    setMode(history.slice(-1)[0])
  }, [history])

  function transition(newmode, replace = false) {
    setMode(newmode);
    setHistory(prev => (replace) ?
      ([...prev.slice(0, -1), newmode]) : ([...prev, newmode]) );
  };

  function back() {
    setHistory(prev => [...prev.slice(0, -1)]);
  };

  return { mode, transition, back };

};