export const MenuConfigReducer = (state, action) => {
  //  let cache = [];
  //  localStorage.setItem(
  //    'menuConfigData',
  //    JSON.stringify(action.data, (key, value) => {
  //      if (typeof value === 'object' && value !== null) {
  //        // Duplicate reference found, discard key
  //        if (cache.includes(value)) return;

  //        // Store value in our collection
  //        cache.push(value);
  //      }
  //      return value;
  //    }),
  //  );
  switch (action.type) {
    case 'MENU_CONFIG':
      return { ...state, menuConfigData: action.data };
    default:
      return state;
  }
};
