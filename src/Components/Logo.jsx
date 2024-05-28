import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

const Logo = () => {
  return (
    <Box
      component={Link}
      to="/"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px', // Adjust the container height if needed
        position: 'relative',
        zIndex: 10, // Ensure the logo is above the navbar
      }}
    >
      <img
        src='./src/images/yallaBuyLogo.png'
        alt="Logo"
        style={{ height: '120%', position: 'flex',left:'1%', top: '-10%' }} // Adjust the height and position to fit your needs
      />
    </Box>
  );
};

export default Logo;
