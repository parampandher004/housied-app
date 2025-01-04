import { ACTION_TYPES } from "./ActionTypes";
import Logo from "../assets/logo/logo-H.svg";

const setBaseColors = (userType) => {
  const baseColors = {
    tenant: "primary",
    house_owner: "secondary",
    admin: "tertiary",
  };
  const prefix = baseColors[userType] || "primary";

  ["100", "200", "300", "400"].forEach((shade) => {
    document.documentElement.style.setProperty(
      `--base-${shade}`,
      `var(--${prefix}-${shade})`
    );
  });
};

export const initialState = {
  auth: {
    isAuthenticated: false,
    userToken: null,
    userType: "",
    userID: null,
    userName: "",
    email: "",
  },
  user: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    dob: "",
    profilePicture: "",
  },
  ui: {
    currentPage: "landing",
    showDropdownMenu: false,
  },
  data: {
    availableHouses: [],
    personalListings: [],
    dashboardData: null,
  },
  error: null,
  notifications: [],
  logo: {
    src: Logo,
    alt: "Housied Logo",
  },
};

export const globalStateReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN:
      setBaseColors(action.payload.userType);
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: true,
          userToken: action.payload.token,
          userType: action.payload.userType,
          userID: action.payload.userID,
          userName: action.payload.userName,
          email: action.payload.email,
        },
        user: {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          phoneNumber: action.payload.phoneNumber,
          address: action.payload.address,
          dob: action.payload.dob,
          profilePicture: action.payload.profilePicture,
        },
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
      };
    case ACTION_TYPES.SET_AVAILABLE_HOUSES:
      return {
        ...state,
        data: {
          ...state.data,
          availableHouses: action.payload,
        },
      };
    case ACTION_TYPES.SET_PERSONAL_LISTINGS:
      return {
        ...state,
        data: {
          ...state.data,
          personalListings: action.payload,
        },
      };
    case ACTION_TYPES.SET_DASHBOARD_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          dashboardData: action.payload,
        },
      };
    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ACTION_TYPES.REGISTER:
      setBaseColors(action.payload.userType);
      return {
        ...state,
        auth: {
          ...state.auth,
          isAuthenticated: true,
          userToken: action.payload.token,
          userType: action.payload.userType,
          userID: action.payload.userID,
          userName: action.payload.userName,
          email: action.payload.email,
        },
        user: {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          phoneNumber: action.payload.phoneNumber,
          address: action.payload.address,
          dob: action.payload.dob,
          profilePicture: action.payload.profilePicture,
        },
      };
    case ACTION_TYPES.UPDATE_USER_DETAILS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload.userDetails,
        },
      };
    default:
      return state;
  }
};
