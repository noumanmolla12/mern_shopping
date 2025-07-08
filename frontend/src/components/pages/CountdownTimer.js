import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
   <div className="best-deal-countdown text-center ul-li">
  <ul style={{ listStyle: "none", padding: 0, display: "flex", justifyContent: "center", gap: "10px" }}>
    <li className="days" style={{ color: "orange" }}>
      <span className="or-count-down-number">{timeLeft.days}</span>
      <span className="count-unit">Days</span>
    </li>

    <li className="hours" style={{ color: "orange" }}>
      <span className="or-count-down-number">{timeLeft.hours}</span>
      <span className="count-unit">Hours</span>
    </li>

    <li className="minutes" style={{ color: "orange" }}>
      <span className="or-count-down-number">{timeLeft.minutes}</span>
      <span className="count-unit">Mins</span>
    </li>

    <li className="seconds" style={{ color: "orange" }}>
      <span className="or-count-down-number">{timeLeft.seconds}</span>
      <span className="count-unit">Sec</span>
    </li>
  </ul>
</div>

  );
};

export default CountdownTimer;
