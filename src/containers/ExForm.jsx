import { useState } from 'react';
import FixForm from './FixForm';
import styles from './styles/ExForm.module.scss';
import Button from '../components/Button.jsx';
import Search from '../components/Search.jsx';
import ExList from '../components/ExList.jsx';
import useExerciseLog from '../hooks/useExerciseLog.jsx';
import UseDailyData from '../components/UseDailyData.jsx';
//NOTE:운동입력 폼

const ExForm = () => {
  const { selectedDate, checkKcal, checkExercise, setSelectedDate } =
    UseDailyData();
  const {
    handleDurationChange,
    handleUploadClick,
    durations,
    exItem,
    logId,
    dateId,
  } = useExerciseLog(selectedDate);

  return (
    <div className={styles.container}>
      <FixForm
        checkKcal={checkKcal}
        checkExercise={checkExercise}
        selectDate={setSelectedDate}
        currentYearMonth={{
          year: parseInt(selectedDate.slice(0, 4)),
          month: parseInt(selectedDate.slice(5, 7)),
        }}
      />
      <div className={styles.ExFormWrapper}>
        <div className={styles.ExFormContainer}>
          <header className={styles.header}>
            <Button variant={'backBtn'}></Button>
            <div className={styles.category}>운동</div>
            <div onClick={handleUploadClick}>
              <Button variant={'exupload'}>업로드</Button>
            </div>
          </header>
          <main className={styles.ExWrapper}>
            <Search />
            <ExList
              durations={durations}
              onDurationChange={handleDurationChange}
              exItem={exItem}
              log_id={logId}
              date_id={dateId}
            />
          </main>
        </div>
      </div>
    </div>
  );
};
export default ExForm;
