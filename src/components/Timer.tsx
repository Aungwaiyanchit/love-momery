"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { differenceInYears, differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";

const START_DATE = new Date("2026-01-19T02:54:00");

interface TimeLeft {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      
      const years = differenceInYears(now, START_DATE);
      const months = differenceInMonths(now, START_DATE) % 12;
      const days = differenceInDays(now, START_DATE) % 30; // Approximation for visual simplicity, or strict calc
      // Date-fns differenceInDays returns total days. We need days remaining after months.
      // A better approach for exact "X years, Y months, Z days" is slightly complex.
      // Let's use a simpler custom calculation or just trust date-fns logic carefully.
      
      // Let's recalculate properly for display:
      // We want: Total duration broken down.
      
      let tempDate = new Date(START_DATE);
      const y = differenceInYears(now, tempDate);
      tempDate.setFullYear(tempDate.getFullYear() + y);
      
      const m = differenceInMonths(now, tempDate);
      tempDate.setMonth(tempDate.getMonth() + m);
      
      const d = differenceInDays(now, tempDate);
      tempDate.setDate(tempDate.getDate() + d);
      
      const h = differenceInHours(now, tempDate);
      tempDate.setHours(tempDate.getHours() + h);

      const min = differenceInMinutes(now, tempDate);
      tempDate.setMinutes(tempDate.getMinutes() + min);
      
      const s = differenceInSeconds(now, tempDate);

      setTimeLeft({ years: y, months: m, days: d, hours: h, minutes: min, seconds: s });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: "Years", value: timeLeft.years },
    { label: "Months", value: timeLeft.months },
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ].filter(unit => unit.value > 0 || (unit.label !== "Years" && unit.label !== "Months"));

  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-center mt-8">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="text-4xl sm:text-5xl md:text-7xl font-bold text-pink-500 drop-shadow-sm font-sans">
            {unit.value < 10 ? `0${unit.value}` : unit.value}
          </div>
          <div className="text-sm sm:text-lg text-pink-300 font-medium lowercase tracking-wide mt-1">
            {unit.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
