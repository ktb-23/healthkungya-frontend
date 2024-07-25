// 액션 타입 지정
const ActionType={
    SET_ID:"SET_ID",
    SET_PASSWORD:"SET_PASSWORD",
    SET_VERIFYPASSWORD:"SET_VERIFYPASSWORD",
    SET_NICKNAME:"SET_NICKNAME",
    SET_WEIGHT:"SET_WEIGHT"
}

// 초기값 지정
const initialState={
    id:"",
    password:"",
    verifyPassword:"",
    nickname:"",
    weight:""
}

const RegisterReducer=(state = initialState, action)=>{
    switch (action.type){
        case ActionType.SET_ID:
            return {...state, id: action.payload}
        case ActionType.SET_PASSWORD:
            return {...state, password: action.payload}
        case ActionType.SET_VERIFYPASSWORD:
            return {...state, verifyPassword: action.payload}
        case ActionType.SET_NICKNAME:
            return {...state, nickname: action.payload}
        case ActionType.SET_WEIGHT:
            return {...state, weight: action.payload}
        default:
            return state
    }
}
export {RegisterReducer,initialState,ActionType}