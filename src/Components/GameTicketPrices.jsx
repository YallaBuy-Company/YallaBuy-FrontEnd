import React from 'react';
import { Grid, Typography, List, ListItem, ListItemText, ThemeProvider, createTheme } from '@mui/material';

export const GameTicketPrices = ({ prices }) => {
  return (
      <Grid container spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch">
     
        <Grid item xs={12}sx={{ 
          border: '1px solid black', 
          borderRadius: 5, 
          color: 'black',
          padding: '10px',
          marginTop:'10px' }}>
          <Typography variant="h6">Suppliers & Prices</Typography>
          <List>
            {prices.map((price) => (
              <ListItem key={price.supplier}>
                <ListItemText gutterBottom primary={price.supplier} secondary={`Price: ${price.price}`} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
  );
};
