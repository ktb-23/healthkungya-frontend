import ProfileSetting from '../components/ProfileSetting';
import UseDailyData from '../components/UseDailyData';
import FixForm from './FixForm';
import styles from './styles/ProfileSettingForm.module.scss';

//NOTE:설정 폼
const ProfileSettingForm = () => {
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
      <div className={styles.ProfileWrapper}>
        <div className={styles.ProfileContainer}>
          <section className={styles.Profile}>
            <ProfileSetting />
          </section>
        </div>
      </div>
    </div>
  );
};
export default ProfileSettingForm;
