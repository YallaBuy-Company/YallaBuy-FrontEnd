import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext({
  userMode: 'guest',
  user: {},
  token: null,
  favoriteGames: [],
  setUserMode: () => {},
  setToken: () => {},
  updateUserDetails: () => {},
  setFavoriteGames: () => {},
});

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({
    userMode: 'guest',
    user: {},
    token: localStorage.getItem('authToken') || null,
    favoriteGames: [],
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

  const setFavoriteGames = (games) => {
    setUserState((prevState) => ({
      ...prevState,
      favoriteGames: games,
    }));
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userState.token) {
        try {
          const response = await axios.get('http://localhost:3000/users/details', {
            headers: {
              Authorization: `Bearer ${userState.token}`,
            },
          });
          setUserMode('user', response.data);
          setFavoriteGames(response.data.favoriteGames || []);
          console.log("")
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchUserDetails();
  }, [userState.token]);

  const value = { ...userState, setUserMode, setToken, updateUserDetails, setFavoriteGames };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
