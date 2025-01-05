import React, { createContext, useReducer, useEffect } from "react";
import Cookies from "js-cookie";
import { globalStateReducer } from "./GlobalStateReducer";
import { initialState } from "./GlobalStateReducer";
import { ACTION_TYPES } from "./ActionTypes";

export const GlobalStateContext = createContext();

const safeParse = (value) => {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const getInitialState = () => {
  const token = Cookies.get("authToken");
  const userDetails = safeParse(Cookies.get("userDetails"));
  const userType = Cookies.get("userType");

  return token && userDetails && userType
    ? {
        ...initialState,
        auth: {
          isAuthenticated: true,
          userToken: token,
          userType,
        },
        user: {
          userID: userDetails.userID,
          email: userDetails.email,
          firstName: userDetails.firstName,
          middleName: userDetails.middleName,
          lastName: userDetails.lastName,
          phoneNumber: userDetails.phoneNumber,
          dob: userDetails.dob,
        },
      }
    : initialState;
};

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalStateReducer, getInitialState());

  useEffect(() => {
    const token = Cookies.get("authToken");
    const userDetails = safeParse(Cookies.get("userDetails"));
    const userType = Cookies.get("userType");

    if (token && userDetails && userType) {
      dispatch({
        type: ACTION_TYPES.LOGIN,
        payload: {
          token: token,

          userID: userDetails.userID,
          email: userDetails.email,
          firstName: userDetails.firstName,
          middleName: userDetails.middleName,
          lastName: userDetails.lastName,
          phoneNumber: userDetails.phoneNumber,
          dob: userDetails.dob,

          userType: userType,
        },
      });
    }
  }, []);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
