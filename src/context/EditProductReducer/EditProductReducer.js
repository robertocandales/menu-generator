export const EditProductReducer = (state, action) => {
  switch (action.type) {
    case 'EDIT_PRODUCT':
      return { ...state, editAproduct: action.data };
    default:
      return state;
  }
};
