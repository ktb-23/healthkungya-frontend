export const InitialState = {
  image: null,
  selectedMeal: '아침',
  foodList: [],
  selectedFood: '',
  mealCalories: 0,
};

export function FoodReducer(state, action) {
  switch (action.type) {
    case 'SET_IMAGE':
      return { ...state, image: action.payload };
    case 'SET_SELECTED_MEAL':
      return { ...state, selectedMeal: action.payload };
    case 'SET_FOOD_LIST':
      return { ...state, foodList: action.payload };
    case 'SET_SELECTED_FOOD':
      return { ...state, selectedFood: action.payload };
    case 'SET_MEAL_CALORIES':
      return { ...state, mealCalories: action.payload };
    case 'CLEAR_FOOD_LIST':
      return { ...state, foodList: [] };
    case 'RESET_FORM':
      return { ...initialState, selectedMeal: state.selectedMeal };
    default:
      return state;
  }
}
