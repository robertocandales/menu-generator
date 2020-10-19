export const TaxOptionsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TAX_OPTIONS':
      return { ...state, taxOptions: action.data };
    default:
      return state;
  }
};
