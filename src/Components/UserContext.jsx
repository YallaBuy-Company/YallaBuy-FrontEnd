import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({
  userMode: 'guest',
  user: {},
  token: null,
  setUserMode: () => {},
  setToken: () => {},
  updateUserDetails: () => {},
});

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({
    userMode: 'guest',
    user: {},
    token: localStorage.getItem('authToken') || null,
  });

  const setUserMode = (mode, userData = {}) => {
    setUserState((prevState) => ({
      ...prevState,
      userMode: mode,
      user: mode === 'user' ? userData : {},
    }));
  };

  const setToken = (token) => {
    setUserState((prevState) => ({
      ...prevState,
      token: token,
    }));
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  };

  const updateUserDetails = (userData) => {
    setUserState((prevState) => ({
      ...prevState,
      user: { ...prevState.user, ...userData },
    }));
  };

  const value = { ...userState, setUserMode, setToken, updateUserDetails };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
