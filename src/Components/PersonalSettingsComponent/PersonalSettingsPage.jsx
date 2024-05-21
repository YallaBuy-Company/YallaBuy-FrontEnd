import React, { useEffect, useState } from "react";
import axios from "axios";
import PersonalDetails from "../PersonalDetails";
import FavoriteGames from "../PersonalFavoriteGames";
import { Container, Typography } from "@mui/material";

export const PersonalSettingsPage = ({ userId, token }) => {
  const [personalDetails, setPersonalDetails] = useState(null);
  const [favoriteGames, setFavoriteGames] = useState([]);

  useEffect(() => {
    const fetchPersonalDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const {games,...personalDetails} = response.data
                setPersonalDetails(personalDetails);
                setFavoriteGames(games);
      } catch (error) {
        console.error('Error fetching personal details:', error);
      }
    };

    
    fetchPersonalDetails();
  }, [userId, token]);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        User Profile
      </Typography>
      {personalDetails && <PersonalDetails personalDetails={personalDetails} />}
      <FavoriteGames favoriteGames={favoriteGames} />
    </Container>
  );
};

export default PersonalSettingsPage;
