export const ProductReducer = (state, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return { ...state, allProducts: action.data };
    default:
      return state;
  }
};
