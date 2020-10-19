export const ResetItemFormDataReducer = (state, action) => {
  switch (action.type) {
    case 'RESET_DATA':
      return { ...state, reseting: action.data };
    default:
      return state;
  }
};
