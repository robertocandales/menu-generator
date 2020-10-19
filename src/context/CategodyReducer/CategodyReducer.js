export const CategodyReducer = (state, action) => {
  const initialState = {
    categories: [],
  };
  switch (action.type) {
    case 'ADD_CATEGORY':
      return { ...state, categories: action.addCategoryData };
    default:
      return state;
  }
};
