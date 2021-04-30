import userTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  // signInSuccess: false,
  // signUpError: [],
  // signUpSuccess: false,
  // resetPasswordSuccess: false,
  // resetPasswordError: [],
  userErr: [],
  resetPasswordSuccess: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //redux thunk
    // case userTypes.SET_CURRENT_USER:
    //   return {
    //     ...state,
    //     currentUser: action.payload,
    //   };
    // case userTypes.SIGN_IN_SUCCESS:
    //   return {
    //     ...state,
    //     signInSuccess: action.payload,
    //   };
    // case userTypes.SIGN_UP_SUCCESS:
    //   return {
    //     ...state,
    //     signUpSuccess: action.payload,
    //   };
    // case userTypes.SIGN_UP_ERROR:
    //   return {
    //     ...state,
    //     signUpError: action.payload,
    //   };
    // case userTypes.RESET_PASSWORD_SUCCESS:
    //   return {
    //     ...state,
    //     resetPasswordSuccess: action.payload,
    //   };
    // case userTypes.RESET_PASSWORD_ERROR:
    //   return {
    //     ...state,
    //     resetPasswordError: action.payload,
    //   };
    // case userTypes.RESET_AUTH_FORMS:
    //   return {
    //     ...state,
    //     signInSuccess: false,
    //     signUpError: [],
    //     signUpSuccess: false,
    //     resetPasswordSuccess: false,
    //     resetPasswordError: [],
    //   };
    // redux saga
    case userTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        userErr: [],
      };
    case userTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: action.payload,
      };
    case userTypes.USER_ERROR:
      return {
        ...state,
        userErr: action.payload,
      };
    case userTypes.RESET_USER_STATE:
    case userTypes.SIGN_OUT_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default userReducer;
