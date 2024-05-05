import zIndex from "@mui/material/styles/zIndex";
import { padding, textAlign } from "@mui/system";
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
export const Navimg = ({ src, title }) => {
  const styles = {
    container: {
      position: 'relative',
      width: '100vw',
      height: '70vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end', // Align content to the bottom
      alignItems: 'center',
      padding:0,
    },
    
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    titleBox: {
      width: '80%', // Set title box width to 80%
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: Semi-transparent background
      padding: '1rem',
      zIndex:1,
      textAlign:'start'
    },
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <div style={styles.container}>
      <img src={src} alt="Image" style={styles.image} />
      <div style={styles.titleBox}>
      <Typography variant="h2" p={0} m={0} gutterBottom>
        Soccer
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ borderBottom: 1 }}>
        Tickets
      </Typography>

      <Stack direction="row" spacing={1} sx={{marginTop:'20px'}} >
        <Chip label="Clickable" variant="outlined" onClick={handleClick} sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.5) !important' } }}/>
        <Chip label="Clickable" variant="outlined" onClick={handleClick} sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.5) !important' } }}/>
        <Chip label="Clickable" variant="outlined" onClick={handleClick} sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.5) !important' } }}/>
      </Stack>
      </div> {/* Add title before image */}
    </div>
  );
};
