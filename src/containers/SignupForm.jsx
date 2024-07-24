import React, { useState,useEffect } from 'react';
import styles from './styles/SignupForm.module.scss';
import Input from '../components/Input';
import { handleBlur, handleSubmit } from '../config/validation';
import Button from '../components/Button';

function SignupForm() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [weight, setWeight] = useState('');

    const [errors, setErrors] = useState({});

    const [hasErrors, setHasErrors] = useState(false);

    useEffect(() => {
        setHasErrors(Object.values(errors).some(error => error !== ''));
    }, [errors]);


    const submitForm = () => {
        
    };

    return (
        <main className={styles.main}>
            <div className={styles.signupmodal}>
                <Button variant={"back"}/>
                <div className={styles.logo}></div>
                <section className={styles.inputs} style={{ '--input-gap': hasErrors ? 'var(--spacing-small)' : 'var(--spacing-medium)' }}>
                    <form className={styles.inputs} onSubmit={(e) => handleSubmit(e, id, password, verifyPassword, nickname, weight, setErrors, submitForm)}>
                        <Input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            onBlur={() => handleBlur('id', id, setErrors)}
                            placeholder="아이디는 4~20자의 알파벳과 숫자만 허용"
                            variant={"registerinput"}
                            error={errors.id}
                        />
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => handleBlur('password', password, setErrors)}
                            placeholder="비밀번호(8자 이상, 문자/숫자/기호 사용 가능)"
                            variant={"registerinput"}
                            error={errors.password}
                        />
                        <Input
                            type="password"
                            value={verifyPassword}
                            onChange={(e) => setVerifyPassword(e.target.value)}
                            onBlur={() => handleBlur('verifyPassword', verifyPassword, setErrors, password)}
                            placeholder="비밀번호 확인"
                            variant={"registerinput"}
                            error={errors.verifyPassword}
                        />
                        <Input
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            onBlur={() => handleBlur('nickname', nickname, setErrors)}
                            placeholder="닉네임(1~8자)"
                            variant={"registerinput"}
                            error={errors.nickname}
                        />
                        <Input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            onBlur={() => handleBlur('weight', weight, setErrors)}
                            placeholder="몸무게"
                            variant={"registerinput"}
                            step="0.1"
                            error={errors.weight}
                        />
                        <div type="submit">
                            <Button variant={"signup"}>회원가입</Button>
                        </div>
                    </form>
                    <div>
                        <Button>로그인</Button>
                    </div>
                    
                </section>
                
            </div>
        </main>
    );
}

export default SignupForm;
