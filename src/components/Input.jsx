import React from 'react';
import styles from './styles/Input.module.scss'; // Ensure the path is correct

const Input = ({ type = 'text', value, onChange, onBlur, placeholder, variant, step, error }) => {
    const inputClass = `${styles.input} ${styles[variant]}`;
    return (
        <>
            <input
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                className={`${inputClass} ${error ? styles.errorInput : ''}`}
                step={step}
            />
            {/* 유효성 검사 실패시 */}
            {error && <div className={styles.errorText}>{error}</div>}
        </>
    );
};

export default Input;
