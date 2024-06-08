import React from 'react';
import { Grid } from '@mui/material';
import {Cardimg} from './Cardimg';

const cardData = [
  {
    title: 'Card Title 1',
    description: 'Description for card 1',
    image: 'src/images/L-nba.jpg',
  },
  {
    title: 'Card Title 2',
    description: 'Description for card 2',
    image: 'src/images/L-nba.jpg',
  },
  {
    title: 'Card Title 3',
    description: 'Description for card 3',
    image: 'src/images/L-nba.jpg',
  },
  {
    title: 'Card Title 4',
    description: 'Description for card 4',
    image: 'src/images/L-nba.jpg',
  },
  {
    title: 'Card Title 5',
    description: 'Description for card 5',
    image: 'src/images/L-nba.jpg',
  },
  {
    title: 'Card Title 6',
    description: 'Description for card 6',
    image: 'src/images/L-nba.jpg',
  },
  {
    title: 'Card Title 7',
    description: 'Description for card 7',
    image: 'src/images/L-nba.jpg',
  },
  {
    title: 'Card Title 8',
    description: 'Description for card 8',
    image: 'src/images/L-nba.jpg',
  },
  {
    title: 'Card Title 9',
    description: 'Description for card 9',
    image: 'src/images/L-nba.jpg',
  },
  {
    title: 'Card Title 10',
    description: 'Description for card 10',
    image: 'src/images/L-nba.jpg',
  },
  {
    title: 'Card Title 11',
    description: 'Description for card 11',
    image: 'src/images/L-nba.jpg',
  },
  {
    title: 'Card Title 12',
    description: 'Description for card 12',
    image: 'src/images/L-nba.jpg',
  }
];

export const Cardgrid = () => {
    return (
      <Grid container spacing={2} marginTop={2}>  {/* Adjust spacing as needed */}
        {cardData.map((card) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={card.title} >
            <Cardimg title={card.title} description={card.description} src={card.image} />
          </Grid>
        ))}
      </Grid>
    );
  };

