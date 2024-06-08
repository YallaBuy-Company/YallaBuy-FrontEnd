import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';

export const TicketNavImg = ({ src }) => {
    const [ticketDetails, setTicketDetails] = useState({});
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const details = {
            date: searchParams.get('date'),
            location: searchParams.get('location'),
            team1: searchParams.get('team1'),
            team2: searchParams.get('team2'),
        };
        setTicketDetails(details);
    }, [location.search]);

    return (
        <Box
            position="relative"
            width="100vw"
            height="70vh"
            display="flex"
            justifyContent="center"
            alignItems="flex-end"
            padding={0}
        >
            <Box
                component="img"
                src={src}
                alt="Image"
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                sx={{ objectFit: 'cover' }}
            />
            <Box
                width="50%"
                bgcolor="rgba(0, 0, 0, 0.5)"
                padding={2}
                zIndex={1}
                textAlign="start"
                color="white"
            >
                <Typography variant="h2" gutterBottom>
                    Ticket
                </Typography>
                <Typography variant="h5" gutterBottom sx={{ borderBottom: 1 }}>
                    Details
                </Typography>
                <Typography variant="h6">Game Ticket Details</Typography>
                <Typography>{`Date: ${ticketDetails.date}`}</Typography>
                <Typography>{`Location: ${ticketDetails.location}`}</Typography>
                <Typography>{`${ticketDetails.team1} VS ${ticketDetails.team2}`}</Typography>
            </Box>
        </Box>
    );
};

export default TicketNavImg;
