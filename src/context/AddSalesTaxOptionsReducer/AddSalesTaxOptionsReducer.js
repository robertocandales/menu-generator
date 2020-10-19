export const AddSalesTaxOptionsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SALES_TAX_OPTIONS':
      return {
        ...state,
        salesTaxOption: action.onchageSales,
        salesTaxPorcent: action.porcentValue,
      };
    default:
      return state;
  }
};
