
import React, { useState, useEffect } from 'react';

export const PillCountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const endDate = new Date("2025-07-10T12:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const timeDiff = endDate - now;

      if (timeDiff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (value: number) => String(value).padStart(2, '0');

  return (
    <div className="inline-flex items-center bg-[#d1f5e0] text-black px-5 py-2.5 rounded-full font-bold gap-3 shadow-sm">
      <div className="flex gap-1.5 text-lg">
        <span>⏱️</span>
        <span>🕒</span>
      </div>
      <div className="text-lg tracking-wider">
        {isExpired 
          ? "00:00:00:00" 
          : `${formatTime(timeLeft.days)}:${formatTime(timeLeft.hours)}:${formatTime(timeLeft.minutes)}:${formatTime(timeLeft.seconds)}`
        }
      </div>
      <div className="text-[15px]">
        {isExpired ? "⏳ Offer Closed!" : "Only Limited Time Left!"}
      </div>
    </div>
  );
};

export default PillCountdownTimer;
