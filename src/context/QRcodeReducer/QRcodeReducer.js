export const QRcodeReducer = (state, action) => {
  switch (action.type) {
    case 'URL':
      return { ...state, url: action.url };
    default:
      return state;
  }
};
