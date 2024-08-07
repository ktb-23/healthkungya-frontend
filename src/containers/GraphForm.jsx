import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import FixForm from './FixForm';
import UseDailyData from '../components/UseDailyData';
import './styles/GraphForm.scss';
import IndexButton from '../components/\bIndexButton';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 임포트해야 함
import Button from '../components/Button'; // Button 컴포넌트 임포트

// Chart.js에서 사용해야 하는 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GraphForm = () => {
  const { selectedDate, checkKcal, checkExercise, setSelectedDate } =
    UseDailyData();

  // 주차를 관리
  const [calories, setCalories] = useState([]);
  const navigate = useNavigate(); // navigate 훅 사용

  // 현재 선택된 날짜의 주를 찾는 함수
  const getCurrentWeekDates = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    return Array.from({ length: 7 }, (_, i) => {
      const nextDate = new Date(startOfWeek);
      nextDate.setDate(startOfWeek.getDate() + i);
      return nextDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로
    });
  };

  // 선택된 날짜의 주차에 대한 칼로리 데이터 업데이트
  useEffect(() => {
    const weekDates = getCurrentWeekDates(selectedDate);

    // 주간 칼로리 데이터를 계산
    const weekCalories = weekDates.map((date) => {
      return checkKcal(date) ? 2000 : 0; // 실제 로직으로 데이터 업데이트
    });

    setCalories(weekCalories);
  }, [selectedDate]);

  const data = {
    labels: ['일', '월', '화', '수', '목', '금', '토'],
    datasets: [
      {
        label: 'Food kcal',
        data: calories,
        fill: false,
        borderColor: '#AFEB92',
      },
    ],
  };

  // 차트 옵션 설정
  const options = {
    plugins: {
      legend: {
        display: false, // 범례 비활성화
      },
      tooltip: {
        enabled: false, // 툴팁 비활성화
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // X축의 그리드 라인 비활성화
        },
        title: {
          display: false, // X축의 제목 비활성화
        },
      },
      y: {
        grid: {
          display: false, // Y축의 그리드 라인 비활성화
        },
        title: {
          display: false, // Y축의 제목 비활성화
        },
      },
    },
  };

  return (
    <>
      <FixForm
        checkKcal={checkKcal}
        checkExercise={checkExercise}
        selectDate={setSelectedDate}
        selectedDate={selectedDate}
      />
      <div className="index-button">
        <Button variant="mainback" onClick={() => navigate('/mainpage')} />
        <IndexButton className="indexdiet" indextype="식단" />
        <IndexButton className="indexex" indextype="운동" />
        <IndexButton className="indexweight" indextype="체중" />
      </div>
      <div className="graph-container">
        <Line data={data} options={options} /> {/* options 추가 */}
      </div>
    </>
  );
};

export default GraphForm;
