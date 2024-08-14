import Setting from '../components/Setting';
import UseDailyData from '../components/UseDailyData';
import FixForm from './FixForm';
import styles from './styles/SettingForm.module.scss';

//NOTE:설정 폼
const SettingForm = () => {
  const { selectedDate, checkKcal, checkExercise, setSelectedDate } =
    UseDailyData();
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
      <div className={styles.SettingWrapper}>
        <div className={styles.SettingContainer}>
          <section className={styles.settings}>
            <Setting />
          </section>
        </div>
      </div>
    </div>
  );
};
export default SettingForm;
