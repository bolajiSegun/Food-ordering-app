'use client';
import { useState, useEffect } from 'react';

const targetDate: Date = new Date('2023-12-03T12:00:00Z');

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;

    const formatNumber = (num: number): string => {
      return num < 10 ? `0${num}` : `${num}`;
    };

    if (difference <= 0) {
      return 'Countdown expired';
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return `${formatNumber(days)}:${formatNumber(hours)}:${formatNumber(
      minutes
    )}:${formatNumber(seconds)}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <span>{timeLeft}</span>
    </>
  );
};

export default Countdown;
