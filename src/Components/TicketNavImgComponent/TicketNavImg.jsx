import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Typography from '@mui/material/Typography';
import './TicketNavImg.css';

export const TicketNavImg = ({src}) => {
    const [ticketDetails, setTicketDetails] = useState({});

//const { date,location,team1,team2 } = useParams(); 
  //usage example:
  const date="12/4/24";
  const location="camp no";
  const team1="Hapoel Afula";
  const team2="Real Madrid";

  ////////////////

  useEffect(() => {
    const gameDetails = async () => {
      try {
        const details = {
            date: date,
            location: location,
            team1: team1,
            team2: team2,
          };
          setTicketDetails(details);
        
      } catch (error) {
        console.error('Error update data:', error);
      }
    };

    gameDetails();
  } , [date,location,team1,team2]);


  return (
    <div className="container">
      <img src={src} alt="Image" className="image" />
      <div className="titleBox">
      <Typography variant="h2" p={0} m={0} gutterBottom>
        Ticket
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ borderBottom: 1 }}>
        details
      </Typography>
      <Typography variant="h6">Game Ticket Details</Typography>
        <Typography>{`Date: ${ticketDetails.date}`}</Typography>
        <Typography>{`Time: ${ticketDetails.date}`}</Typography>
        <Typography>{`Location: ${ticketDetails.location}`}</Typography>
        <Typography>{`${ticketDetails.team1} VS ${ticketDetails.team2}`}</Typography>
      </div> 
    </div>
  );
};
