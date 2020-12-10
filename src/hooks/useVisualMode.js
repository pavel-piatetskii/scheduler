import React, { useState, useEffect } from "react";

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newmode, replace = false) {
    setMode(newmode);
    (replace) ? history[history.length - 1] = newmode : history.push(newmode);
  };

  function back() {
    history.length > 1 && history.pop();
    setMode(history.slice(-1)[0]);
  };

  return { mode, transition, back };

};