//NOTE:캘린더 컴포넌트
import React, { useState } from 'react';
import './styles/Calendar.scss';
import montharrowleft from '../picture/montharrleft.png';
import montharrowright from '../picture/montharrright.png';
import Sample from '../picture/sample.svg';

const Calendar = () => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const [currentYear, setCurrentYear] = useState(2024);
  const [currentMonth, setCurrentMonth] = useState(7); // 7월

  const getFirstDayOfMonth = () => {
    return new Date(currentYear, currentMonth - 1, 1).getDay();
  };

  const getLastDateOfMonth = () => {
    return new Date(currentYear, currentMonth, 0).getDate();
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 1) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 12;
      } else {
        return prevMonth - 1;
      }
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 12) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 1;
      } else {
        return prevMonth + 1;
      }
    });
  };

  return (
    <div className="calendar">
      <div className="sample">
        <img src={Sample} />
      </div>
      <div className="month-controls">
        <button className="prevmonth" onClick={handlePreviousMonth}>
          <img src={montharrowleft} alt="previous month" />
        </button>
        <span className="yearmonth">{`${currentYear}년 ${currentMonth}월`}</span>
        <button className="nextmonth" onClick={handleNextMonth}>
          <img src={montharrowright} alt="next month" />
        </button>
      </div>

      <div className="days-of-week">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="dates">
        {[...Array(getFirstDayOfMonth()).keys()].map((_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {[...Array(getLastDateOfMonth()).keys()].map((date) => (
          <div key={date + 1}>
            <button className="date-button"></button>
            {date + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
