const ActionType = {
  SET_NAME: 'SET_NAME',
  SET_STATUS_MESSAGE: 'SET_STATUS_MESSAGE',
  SET_ID: 'SET_ID',
  SET_IMAGEURL: 'SET_IMAGEURL',
};
const initialState = {
  name: '',
  status_message: '',
  id: '',
  imageUrl: '',
};
const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_NAME:
      return { ...state, name: action.payload };
    case ActionType.SET_STATUS_MESSAGE:
      return { ...state, status_message: action.payload };
    case ActionType.SET_ID:
      return { ...state, id: action.payload };
    case ActionType.SET_IMAGEURL:
      return { ...state, imageUrl: action.payload };
  }
};
export { ProfileReducer, initialState, ActionType };
