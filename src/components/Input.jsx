import React from 'react';
import styles from './styles/Input.module.scss'; // Ensure the path is correct
import { FaCheck, FaTimes } from 'react-icons/fa';

const Input = ({ type = 'text', value, onChange, onBlur, placeholder, variant, step, error}) => {
    const inputClass = `${styles.input} ${styles[variant]}`;
    return (
        <div>
            <input
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                className={`${inputClass} ${error ? styles.error : ''}`}
                step={step}
            />
            {/* 삼항 연사자를 이용한 사용가능 중복여부 에러 여부 */}
            {error=="사용 가능합니다."? <div className={styles.successText}>{error}</div> : <div className={styles.errorText}>{error}</div> }
        </div>
    );
};

export default Input;
