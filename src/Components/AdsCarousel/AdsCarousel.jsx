/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import './AdsCarousel.css'; // Ensure you import your CSS file

export function AdsCarousel({ src }) {
  const items = [
    {
      name: "Ad 1",
      description: "Discover our latest product!",
      image: src,
    },
    {
      name: "Ad 2",
      description: "Discover our latest product!",
      image: src,
    }
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item({ item }) {
  return (
    <Paper className="container">
      <img src={item.image} alt={item.name} className="image" />
      <div className="titleBox">
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <Button className="CheckButton">Check it out!</Button>
      </div>
    </Paper>
  );
}

AdsCarousel.propTypes = {
  src: PropTypes.string.isRequired,
};
