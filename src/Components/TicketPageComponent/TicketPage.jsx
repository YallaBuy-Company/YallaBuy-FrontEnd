import React, { useState, useEffect } from 'react';
import { Grid, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useParams } from 'react-router-dom'; // Import for accessing query params
import { GameTicketPrices } from '../GameTicketPrices'; // Import your component

const fetchSuppliers = async () => {
  // const response = await fetch('/suppliers');
  // const data = await response.json();
   const data = ["TicketMaster","Official","StubHub"];
  return data;
};

const fetchPrices = async ({ suppliers , gameId }) => {
  //const response = await fetch(`/supplierPath/${gameId}`);
  //const data = await response.json();
  const data = [
    { supplier: "TicketMaster", price: "120$" },
    { supplier: "Official", price: "90$" },
    { supplier: "StubHub", price: "85$" },
  ];
  
  return data;
};

export const TicketPage = () => {
  const [prices, setPrices] = useState([]);
  //const {gameId} = useParams(); 
  const gameId= "1111"; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supplierData = await fetchSuppliers();

        const priceData = await fetchPrices({ supplierData },{ gameId });
        setPrices(priceData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  fetchData();
  } , [gameId]);

  return (
    <>
    <GameTicketPrices prices={prices} />
    </>
  );
};
