import zIndex from "@mui/material/styles/zIndex";
import { padding, textAlign } from "@mui/system";
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import './Navimg.css';

export const Navimg = ({ src, title }) => {
  

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <div className="container">
      <img src={src} alt="Image" className="image" />
      <div className="titleBox">
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
