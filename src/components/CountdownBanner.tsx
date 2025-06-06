
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
    <div className="bg-whatsapp text-white py-3 sm:py-4 md:py-5 px-3 sm:px-4 md:px-5 text-center shadow-md relative z-50">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-2.5 m-0">
        🚀 GetWapify Early Access Ends Soon!
      </h2>
      <div className="text-sm sm:text-base mb-3 sm:mb-4">
        8,947 businesses joined already
      </div>

      <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 text-base sm:text-lg md:text-xl font-bold">
        <div className="bg-white/15 rounded-lg py-2 sm:py-2.5 px-2 sm:px-3 md:px-4 min-w-[60px] sm:min-w-[65px] md:min-w-[70px]">
          <span className="block text-sm sm:text-base md:text-xl">{timeLeft.days}</span>
          <span className="text-xs font-normal mt-1 block">Days</span>
        </div>
        <div className="bg-white/15 rounded-lg py-2 sm:py-2.5 px-2 sm:px-3 md:px-4 min-w-[60px] sm:min-w-[65px] md:min-w-[70px]">
          <span className="block text-sm sm:text-base md:text-xl">{timeLeft.hours}</span>
          <span className="text-xs font-normal mt-1 block">Hours</span>
        </div>
        <div className="bg-white/15 rounded-lg py-2 sm:py-2.5 px-2 sm:px-3 md:px-4 min-w-[60px] sm:min-w-[65px] md:min-w-[70px]">
          <span className="block text-sm sm:text-base md:text-xl">{timeLeft.minutes}</span>
          <span className="text-xs font-normal mt-1 block">Minutes</span>
        </div>
        <div className="bg-white/15 rounded-lg py-2 sm:py-2.5 px-2 sm:px-3 md:px-4 min-w-[60px] sm:min-w-[65px] md:min-w-[70px]">
          <span className="block text-sm sm:text-base md:text-xl">{timeLeft.seconds}</span>
          <span className="text-xs font-normal mt-1 block">Seconds</span>
        </div>
      </div>

      <div className="mt-3 sm:mt-4 text-sm sm:text-base font-bold px-2">
        Only <strong>1,053</strong> seats left at ₹799 <span className="line-through text-gray-200">₹1,999</span>
      </div>
    </div>
  );
};

export default CountdownBanner;
