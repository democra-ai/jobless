'use client';

import React, { useState, useEffect } from 'react';

function Counter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const steps = 60;
    const stepValue = end / steps;
    const stepDuration = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current * 10) / 10);
      }
    }, stepDuration);
    return () => clearInterval(timer);
  }, [end, duration]);

  return <span className="font-mono font-bold">{count.toLocaleString()}{suffix}</span>;
}

export default Counter;
