import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Box } from '@mui/material';

const FavoriteGames = ({ favoriteGames }) => {
  const [games, setGames] = useState(favoriteGames);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedGames = [...games];
    updatedGames[index][name] = value;
    setGames(updatedGames);
  };

  const handleUpdate = () => {
    // Implement update logic here
    console.log('Updated favorite games:', games);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Favorite Games
      </Typography>
      {games.map((game, index) => (
        <Box key={index} mb={4} p={2} border={1} borderRadius={4}>
          <Typography variant="h6" gutterBottom>
            Game {index + 1}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Home Team"
                name="homeTeam"
                value={game.homeTeam}
                onChange={(e) => handleChange(index, e)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Away Team"
                name="awayTeam"
                value={game.awayTeam}
                onChange={(e) => handleChange(index, e)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Country"
                name="country"
                value={game.country}
                onChange={(e) => handleChange(index, e)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                name="city"
                value={game.city}
                onChange={(e) => handleChange(index, e)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Stadium"
                name="stadium"
                value={game.stadium}
                onChange={(e) => handleChange(index, e)}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date"
                name="date"
                type="date"
                value={game.date}
                onChange={(e) => handleChange(index, e)}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update
      </Button>
    </Container>
  );
};

export default FavoriteGames;
