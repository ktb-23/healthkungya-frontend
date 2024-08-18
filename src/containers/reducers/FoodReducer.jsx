export const InitialState = {
  image: null,
  selectedMeal: '아침',
  foodList: ['500kcal'], // 기본 옵션 추가
  selectedFood: '',
  mealCalories: {
    아침: 0,
    점심: 0,
    저녁: 0,
  },
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
      return {
        ...state,
        selectedFood: action.payload,
      };

    case 'SET_MEAL_CALORIES':
      const { meal, value } = action.payload;
      return {
        ...state,
        mealCalories: {
          ...state.mealCalories,
          [meal]: value,
        },
      };

    case 'CLEAR_FOOD_LIST':
      return {
        ...state,
        selectedFood: '',
        mealCalories: {
          아침: 0,
          점심: 0,
          저녁: 0,
        },
      };

    case 'RESET_FORM':
      return { ...InitialState, selectedMeal: state.selectedMeal };

    default:
      return state;
  }
}
