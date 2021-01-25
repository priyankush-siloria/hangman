const initialState = {
  avail_response: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "EMPLOYEE_AVAIL_RESPONSE":
      return {
        ...state,
        avail_response: action.payload,
      };

    default:
      return state;
  }
}
