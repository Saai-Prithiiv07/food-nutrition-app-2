// Load initial state from localStorage if available
const savedData = localStorage.getItem('saved_food_items');
export const initialState = {
  saved: savedData ? JSON.parse(savedData) : [],
};

export function savedReducer(state, action) {
  let newState;
  switch (action.type) {
    case "SAVE_ITEM":
    case "ADD":
      const exists = state.saved.find(
        (item) => item.code === action.payload.code
      );
      if (exists) return state;

      newState = {
        ...state,
        saved: [...state.saved, action.payload],
      };
      break;

    case "REMOVE":
      newState = {
        ...state,
        saved: state.saved.filter(
          (item) => item.code !== action.payload
        ),
      };
      break;

    default:
      return state;
  }

  // Persist to localStorage
  localStorage.setItem('saved_food_items', JSON.stringify(newState.saved));
  return newState;
}