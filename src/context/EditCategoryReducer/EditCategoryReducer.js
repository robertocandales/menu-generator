export const EditCategoryReducer = (state, action) => {
  switch (action.type) {
    case 'EDIT_CATEGORY':
      return { ...state, edit: action.data };
    default:
      return state;
  }
};
