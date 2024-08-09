import styles from './styles/ExList.module.scss';
const ExList = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.ListWrapper} aria-labelledby="exercise-list">
        <ul className={styles.exerciseList}>
          <li className={styles.exerciseItem}>
            <label>Exercise 1</label>
            <select id="exercise1" aria-label="Select time for exercise 1">
              <option value="5">5분</option>
              <option value="10">10분</option>
              <option value="15">15분</option>
            </select>
            분
          </li>
          <li className={styles.exerciseItem}>
            <label>Exercise 2</label>
            <select>
              <option value="5">5분</option>
              <option value="10">10분</option>
              <option value="15">15분</option>
            </select>
            분
          </li>
        </ul>
      </section>
      <section className={styles.KcalWrapper}></section>
    </div>
  );
};
export default ExList;
