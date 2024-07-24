// 유효성 검사

const validateId = (value) => {
    if (!value) {
        return '아이디를 입력해주세요.';
    } else if (!/^[a-zA-Z0-9]{4,20}$/.test(value)) {
        return '아이디는 4~20자의 알파벳과 숫자만 허용합니다.';
    }
    return '';
};

const validatePassword = (value) => {
    if (!value) {
        return '비밀번호를 입력해주세요.';
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
        return '비밀번호(8자 이상, 문자/숫자/기호 사용 가능)';
    }
    return '';
};

const validateVerifyPassword = (password, verifyPassword) => {
    if (!verifyPassword) {
        return '비밀번호 확인을 입력해주세요.';
    } else if (verifyPassword !== password) {
        return '비밀번호가 일치하지 않습니다.';
    }
    return '';
};

const validateNickname = (value) => {
    if (!value) {
        return '닉네임을 입력해주세요.';
    } else if (!/^.{1,8}$/.test(value)) {
        return '닉네임은 1~8자여야 합니다.';
    }
    return '';
};

const validateWeight = (value) => {
    if (!value) {
        return '몸무게를 입력해주세요.';
    } else if (isNaN(value) || value <= 0) {
        return '올바른 몸무게를 입력해주세요.';
    }
    return '';
};

// 에러 블러 처리
const handleBlur = (field, value, setErrors, password) => {
    let error = '';
    switch (field) {
        case 'id':
            error = validateId(value);
            break;
        case 'password':
            error = validatePassword(value);
            break;
        case 'verifyPassword':
            error = validateVerifyPassword(password, value);
            break;
        case 'nickname':
            error = validateNickname(value);
            break;
        case 'weight':
            error = validateWeight(value);
            break;
        default:
            break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [field]: error }));
};

// 제출시 에러 확인
const handleSubmit = (e, id, password, verifyPassword, nickname, weight, setErrors, callback) => {
    e.preventDefault();
    const idError = validateId(id);
    const passwordError = validatePassword(password);
    const verifyPasswordError = validateVerifyPassword(password, verifyPassword);
    const nicknameError = validateNickname(nickname);
    const weightError = validateWeight(weight);

    if (idError || passwordError || verifyPasswordError || nicknameError || weightError) {
        setErrors({
            id: idError,
            password: passwordError,
            verifyPassword: verifyPasswordError,
            nickname: nicknameError,
            weight: weightError,
        });
    } else {

        callback();
    }
};

export {
    validateId,
    validatePassword,
    validateVerifyPassword,
    validateNickname,
    validateWeight,
    handleBlur,
    handleSubmit,
};
