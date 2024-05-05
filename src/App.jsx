import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import { Itemscontainer } from './components/Itemscontainer'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { Navimg } from './components/Navimg';
import { Cardgrid } from './components/Cardgrid';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import LoginSignupPopup from './components/LoginSignupPopup';

const theme = createTheme({
    palette: {
      primary: {
        main: '#004d40',
      },
      secondary: blue,
    }
});

function App() {
  const [count, setCount] = useState(0)
  const src ="src/images/navimg.jpg";
  return (
    <>
     <ThemeProvider theme={theme}>

     {/*<Navbar />*/}
     <Navimg src={src} />
     
     <Box sx={{ display: 'flex',flexDirection: 'column', justifyContent: 'center',marginTop:'20px'}}>
     <Container sx={{width:"80%"}}>
     <LoginSignupPopup/>
     <Itemscontainer/>
     <Cardgrid/>
     </Container>
     </Box>
     
     </ThemeProvider>
    </>
  )
}
export default App
