import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext({
  userMode: 'guest',
  setUserMode: () => {},
});

export const UserProvider = ({ children }) => {
  const [userMode, setUserMode] = useState('guest'); // Initial user mode

  const value = { userMode, setUserMode };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

