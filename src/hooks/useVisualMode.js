import { useEffect, useState } from "react";

/**
 * Custom hook which handles logic to switch modes of an appointment
 * When an appointment component is loaded for the first time, its mode
 * is passed to this hook as 'initial' and saved in 'history' state
 */
export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Every time when history changes, last mode in this state is loaded
  useEffect(() => {
    setMode(history.slice(-1)[0])
  }, [history])

  /**
   * Add new mode to history. This simultaneously keeps track of modes
   * history and loads new mode via useEffect.
   * If replace parameter is passed, last mode in history is overwritten
   */
  function transition(newmode, replace = false) {
    setHistory(prev => (replace) ?
      ([...prev.slice(0, -1), newmode]) : ([...prev, newmode]) );
  };

  // Revert current mode to the previous in the history state array
  function back() {
    setHistory(prev => [...prev.slice(0, -1)]);
  };

  return { mode, transition, back };

};