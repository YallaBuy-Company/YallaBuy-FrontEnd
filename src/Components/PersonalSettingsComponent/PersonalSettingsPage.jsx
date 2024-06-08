import React, { useContext } from "react";
import PersonalDetails from "../PersonalDetails";
import PersonalFavoriteGames from "../PersonalFavoriteGames";
import { Container, Typography } from "@mui/material";
import { UserContext } from "../UserContext";

export const PersonalSettingsPage = () => {
  const { user, favoriteGames } = useContext(UserContext);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        User Profile
      </Typography>
      {user && <PersonalDetails personalDetails={user} />}
      <PersonalFavoriteGames favoriteGames={favoriteGames} />
    </Container>
  );
};

export default PersonalSettingsPage;
