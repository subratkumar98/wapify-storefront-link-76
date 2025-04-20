
import React, { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration: number;
  prefix?: string;
  suffix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  end, 
  duration, 
  prefix = '', 
  suffix = '' 
}) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      setCount(Math.min(Math.floor(start), end));
      
      if (start >= end) {
        clearInterval(timer);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [end, duration]);
  
  return (
    <span className="font-bold">
      {prefix}{count}{suffix}
    </span>
  );
};

export default AnimatedCounter;
