import React, { useState, useEffect } from 'react';
import './styles/Calendar.scss';
import montharrowleft from '../picture/montharrleft.png';
import montharrowright from '../picture/montharrright.png';
import Sample from '../picture/sample.svg';
import UseDailyData from '../components/UseDailyData.jsx'; // 훅 가져오기

const Calendar = ({ selectDate }) => {
  const { checkKcal, checkExercise } = UseDailyData();
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

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

  const getDateString = (year, month, day) => {
    return `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;
  };

  useEffect(() => {
    // 현재 월이 변경되면 뭔가 작업이 필요하면 여기에 추가
  }, [currentYear, currentMonth]);

  return (
    <div className="calendar">
      <div className="sample">
        <img src={Sample} alt="sampleimg" />
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

        {[...Array(getLastDateOfMonth()).keys()].map((date) => {
          const dateString = getDateString(currentYear, currentMonth, date + 1);
          const isKcal = checkKcal(dateString);
          const isExercise = checkExercise(dateString);
          const buttonClass = `date-button ${isKcal ? 'has-kcal' : ''} ${isExercise ? 'has-exercise' : ''}`;

          return (
            <div key={date + 1} className="date-container">
              <button
                className={buttonClass}
                onClick={() => selectDate(dateString)}
              ></button>
              <div className="date-label">{date + 1}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
