import React, { createContext, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Navbar } from './components/NavbarComponent/Navbar.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { Navimg } from './components/NavimgComponent/Navimg';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import {HomePage} from './components/HomePageComponent/HomePage'
import {SearchPage} from './components/SearchPageComponent/SearchPage'
import {PersonalSettingsPage} from './components/PersonalSettingsComponent/PersonalSettingsPage'
import {ManagerPage} from './components/ManagerPageComponent/ManagerPage'
import { UserProvider } from './components/UserContext';
import { UserContext } from './components/UserContext';
import { TicketPage } from './components/TicketPageComponent/TicketPage';
import {TicketNavImg} from './components/TicketNavImgComponent/TicketNavImg.jsx';

const theme = createTheme({
    palette: {
      primary: {
        main: '#004d40',
      },
      secondary: blue,
    }
});

function App() {
  const { userMode, setUserMode } = useContext(UserContext);

  const handleLogin = () => {
      setUserMode('user'); // Example update user mode to "user" on login..
  };

  const src ="src/images/navimg.jpg";
  return (
    <>
    <UserProvider>
    <Router>
    <ThemeProvider theme={theme}>
     <Navbar />
            <Routes>
              <Route path="/search" element={<Navimg src={src}/>} /> 
              <Route path="/" element={<Navimg src={src}/>} /> 
              <Route path="/ticket" element={<TicketNavImg src ={src}/>} />
            </Routes>

     <Box sx={{ display: 'flex',flexDirection: 'column', justifyContent: 'center',marginTop:'20px'}}>
     <Container sx={{width:"80%"}}>

            <Routes>
              <Route path="/" element={<HomePage />} /> 
              <Route path="/search" element={<SearchPage />} /> 
              <Route path="/settings" element={<PersonalSettingsPage />} /> 
              <Route path="/manager" element={<ManagerPage />} />
              <Route path="/ticket" element={<TicketPage />} />
            </Routes>

     </Container>
     </Box>
     
     </ThemeProvider>
     </Router>
     </UserProvider>
    </>
  )
}
export default App
