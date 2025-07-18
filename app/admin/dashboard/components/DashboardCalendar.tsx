import { useState } from "react";

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function DashboardCalendar() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = getFirstDayOfWeek(year, month);

  const weeks: (string | null)[][] = [];
  let week: (string | null)[] = Array(firstDayOfWeek).fill(null);
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day.toString());
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  function prevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }
  function nextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="rounded-2xl bg-[#232334] p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <button className="text-2xl" onClick={prevMonth}>
          &#8592;
        </button>
        <div className="font-semibold text-lg">
          {monthNames[month]} {year}
        </div>
        <button className="text-2xl" onClick={nextMonth}>
          &#8594;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-gray-400 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {weeks.flat().map((day, i) => {
          const isToday =
            day &&
            Number(day) === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();
          return (
            <div
              key={i}
              className={`py-1 rounded-lg ${
                isToday
                  ? "bg-[#3ecfff] text-white font-bold relative"
                  : day
                  ? "text-gray-300"
                  : "text-gray-700"
              }`}
            >
              {day}
              {isToday && (
                <span className="absolute right-1 top-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
