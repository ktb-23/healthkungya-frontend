// 액션 타입 지정
const ActionType={
    SET_ID:"SET_ID",
    SET_PASSWORD:"SET_PASSWORD",
}

// 초기값 지정
const initialState={
    id:"",
    password:"",
}

const LoginReducer = (state=initialState, action)=>{
    switch(action.type){
        case ActionType.SET_ID:
            return {...state, id: action.payload}
        case ActionType.SET_PASSWORD:
            return {...state, password: action.payload}
        default:
            return state
    }
}

export {LoginReducer,initialState,ActionType}