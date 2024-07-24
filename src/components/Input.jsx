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
            {error && <div className={styles.errorText}>{error}</div>}
        </div>
    );
};

export default Input;
