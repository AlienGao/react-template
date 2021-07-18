const initialState = ["/monitoring实时监控"];

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MENU_KEY":
      return [...action.payload];
    default:
      return state;
  }
};

export default menuReducer;
