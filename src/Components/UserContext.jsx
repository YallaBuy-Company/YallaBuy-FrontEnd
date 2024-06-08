import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext({
  userMode: 'guest',
  user: {},
  token: null,
  favoriteGames: [],
  email: null,
  setUserMode: () => {},
  setToken: () => {},
  setEmail: () => {},
  updateUserDetails: () => {},
  setFavoriteGames: () => {},
});

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({
    userMode: 'guest',
    user: {},
    token: localStorage.getItem('authToken') || null,
    favoriteGames: [],
    email: localStorage.getItem('authEmail') || null,
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

  const setEmail = (email) => {
    setUserState((prevState) => ({
      ...prevState,
      email: email,
    }));
    if (email) {
      localStorage.setItem('authEmail', email);
    } else {
      localStorage.removeItem('authEmail');
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
      if (userState.token && userState.email) {
        try {
          const response = await axios.get('http://localhost:3000/users/details', {
            headers: {
              Authorization: `Bearer ${userState.token}`,
            },
            params: { email: userState.email },
          });
          setUserMode('user', response.data);
          setFavoriteGames(response.data.favoriteGames || []);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchUserDetails();
  }, [userState.token, userState.email]);

  const value = { ...userState, setUserMode, setToken, setEmail, updateUserDetails, setFavoriteGames };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
