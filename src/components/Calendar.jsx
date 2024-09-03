import React, { useState, useEffect } from 'react';
import './styles/Calendar.scss';
import montharrowleft from '../picture/montharrleft.png';
import montharrowright from '../picture/montharrright.png';
import Sample from '../picture/sample.svg';
import UseDailyData from '../components/UseDailyData.jsx';
import useGetAllDateExlog from '../api/useGetAllDateExlog.jsx';

const Calendar = ({ selectDate }) => {
  const { checkKcal, checkExercise, saveData } = UseDailyData();
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [selectedDateString, setSelectedDateString] = useState('');
  const [exerciseDates, setExerciseDates] = useState([]); // 운동 기록이 있는 날짜 목록

  const handleDateClick = (dateString) => {
    selectDate(dateString);
    setSelectedDateString(dateString);
    sessionStorage.setItem('selectedDateString', dateString);
  };
  const getFirstDayOfMonth = () => {
    return new Date(currentYear, currentMonth - 1, 1).getDay();
  };

  const getLastDateOfMonth = () => {
    return new Date(currentYear, currentMonth, 0).getDate();
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 1 ? 12 : prevMonth - 1));
    if (currentMonth === 1) setCurrentYear((prevYear) => prevYear - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 12 ? 1 : prevMonth + 1));
    if (currentMonth === 12) setCurrentYear((prevYear) => prevYear + 1);
  };

  const getDateString = (year, month, day) => {
    return `${year}-${('0' + month).slice(-2)}-${('0' + day).slice(-2)}`;
  };

  useEffect(() => {
    const savedDateString = sessionStorage.getItem('selectedDateString');
    if (savedDateString) {
      const savedDate = new Date(savedDateString);
      selectDate(savedDateString);
      setSelectedDateString(savedDateString);
      setCurrentYear(savedDate.getFullYear());
      setCurrentMonth(savedDate.getMonth() + 1);
    } else {
      const today = new Date();
      const todayString = getDateString(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
      );
      selectDate(todayString);
      setSelectedDateString(todayString);
    }
  }, []);

  const GetAllDateExlog = async () => {
    try {
      const response = await useGetAllDateExlog();
      const dates = response.map((entry) => entry.dateValue); // 받은 데이터를 날짜로 변환
      setExerciseDates(dates);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    GetAllDateExlog();
  }, []);
  return (
    <div className="calendar">
      <div className="sample">
        <img src={Sample} alt="sampleimg" />
      </div>
      <div className="month-controls">
        <span className="yearmonth">{`${currentYear}년 ${currentMonth}월`}</span>
        <div className="Monthbuttons">
          <button className="prevmonth" onClick={handlePreviousMonth}>
            <img src={montharrowleft} alt="previous month" />
          </button>
          <button className="nextmonth" onClick={handleNextMonth}>
            <img src={montharrowright} alt="next month" />
          </button>
        </div>
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
          const isExercise = exerciseDates.includes(dateString); // 운동 기록 확인
          const isSelected = dateString === selectedDateString;

          return (
            <div key={date + 1} className="date-container">
              <button
                className={`date-button ${isKcal ? 'has-kcal' : ''} ${
                  isExercise ? 'has-exercise' : ''
                }`}
                onClick={() => handleDateClick(dateString)}
              ></button>
              <div className={`date-label ${isSelected ? 'selected' : ''}`}>
                {date + 1}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
