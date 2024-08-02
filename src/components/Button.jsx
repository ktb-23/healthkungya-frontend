//버튼 컴포넌트
import styles from './styles/Button.module.scss';
const Button = ({ children, onClick, variant }) => {
  const buttonClass = `${styles.button} ${styles[variant]}`;
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
