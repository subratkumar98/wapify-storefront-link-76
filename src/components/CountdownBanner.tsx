
import React, { useState, useEffect } from 'react';

export const CountdownBanner: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const endDate = new Date("2025-07-10T12:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeDiff = endDate - now;

      if (timeDiff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-banner bg-whatsapp text-white py-6 px-6 text-center shadow-lg animate-fade-in rounded-b-xl relative z-50">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 m-0">
        🚀 GetWapify Early Access Ends Soon!
      </h2>
      <div className="text-base mb-4 opacity-95">
        8,947 businesses joined already
      </div>

      <div className="countdown-timer inline-flex justify-center gap-4 text-xl font-bold animate-fade-in">
        <div className="countdown-box bg-white/20 rounded-lg py-3 px-4 min-w-[70px] animate-bounce">
          <span className="block">{timeLeft.days}</span>
          <span className="text-xs font-normal mt-1 block">Days</span>
        </div>
        <div className="countdown-box bg-white/20 rounded-lg py-3 px-4 min-w-[70px] animate-bounce">
          <span className="block">{timeLeft.hours}</span>
          <span className="text-xs font-normal mt-1 block">Hours</span>
        </div>
        <div className="countdown-box bg-white/20 rounded-lg py-3 px-4 min-w-[70px] animate-bounce">
          <span className="block">{timeLeft.minutes}</span>
          <span className="text-xs font-normal mt-1 block">Minutes</span>
        </div>
        <div className="countdown-box bg-white/20 rounded-lg py-3 px-4 min-w-[70px] animate-bounce">
          <span className="block">{timeLeft.seconds}</span>
          <span className="text-xs font-normal mt-1 block">Seconds</span>
        </div>
      </div>

      <div className="price-note mt-4 text-lg font-bold animate-pulse">
        Only <strong>1,053</strong> seats left at ₹799 <span className="line-through text-gray-200 font-normal">₹1,999</span>
      </div>
    </div>
  );
};

export default CountdownBanner;
