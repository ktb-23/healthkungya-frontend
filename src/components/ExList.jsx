import axios from 'axios';
import Button from './Button';
import styles from './styles/ExList.module.scss';
import useDeleteExlog from '../api/useDeleteExlog';
import useWeight from '../hooks/useWeight';
const ExList = ({
  exItem,
  durations,
  onDurationChange,
  log_id,
  date_id,
  selectDate,
}) => {
  //met를 몸무게로 시간당 칼로리 계산
  const { weight } = useWeight(selectDate);
  const calculateCalories = (met, duration) => {
    // 몸무게가 0보다 클 때만 계산
    if (weight > 0) {
      return ((met * weight * 3.5) / 200) * duration;
    } else {
      return ((met * localStorage.getItem('weight') * 3.5) / 200) * duration;
    }
  };
  // 전체 칼로리 계산
  const totalCalories = exItem.reduce((total, item) => {
    const duration = durations[item.exitem_id] || item.extime;
    const calories = calculateCalories(item.met, duration);
    return total + calories;
  }, 0);
  const handleDelete = async () => {
    try {
      const response = await useDeleteExlog(log_id, date_id);
      alert(response.message);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.ListWrapper} aria-labelledby="exercise-list">
        <header className={styles.header}>
          <span>운동 목록</span>
          <Button onClick={handleDelete} variant="clear">
            비우기
          </Button>
        </header>
        <ul className={styles.exerciseList}>
          {exItem?.map((item) => {
            const duration = durations[item.exitem_id] || item.extime;

            return (
              <li key={item.exitem_id} className={styles.exerciseItem}>
                <label>{item.ex}</label>
                <div className={styles.selectwrapper}>
                  <select
                    id={`exercise-${item.exitem_id}`}
                    aria-label={`Select time for ${item.ex}`}
                    value={duration}
                    onChange={(e) =>
                      onDurationChange(item.exitem_id, e.target.value)
                    }
                  >
                    {[...Array(50).keys()].map((i) => (
                      <option key={i} value={(i + 1) * 5}>
                        {(i + 1) * 5}
                      </option>
                    ))}
                  </select>
                  <div className={styles.arrow}>
                    <div></div>
                  </div>
                </div>
                <span style={{ position: 'relative', right: '10px' }}>분</span>
              </li>
            );
          })}
        </ul>
      </section>
      <section className={styles.KcalWrapper}>
        <h3>소모 칼로리</h3>
        <p>{totalCalories.toFixed(2)} kcal</p>
      </section>
    </div>
  );
};
export default ExList;
