import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

export const Datetoggle = ({query,setQuery}) => {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const today = new Date(); // Get today's date
  today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison


  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = () => {
    if (!startDate) {
      alert('Please select a start date.');
      return;
    }

    if (startDate < today) {
      alert('Start date cannot be earlier than today.');
      return;
    }

    if (endDate && endDate < startDate) {
      alert('End date cannot be earlier than the start date.');
      return;
    }

    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    handleClose();
  };

  return (
    <div>
      {/* <Button onClick={handleOpen} variant="outlined">
        Select Dates
      </Button> */}
      <Box>
            <InputLabel htmlFor="start-date">Start Date</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="start-date"
                sx={{
                  
                }}
                disablePast
                value={startDate}
                onChange={(date) =>{ setStartDate(date)
                  setQuery({...query, startDate:date.format('DD/MM/YYYY')})
                }}
                format='DD/MM/YYYY'
              />
            </LocalizationProvider>
          </Box>
          <Box mt={2}>
            <InputLabel htmlFor="end-date">End Date</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="end-date"
                disablePast
                minDate={startDate}
                value={endDate}
                onChange={(date) =>{ setEndDate(date)
                  setQuery({...query, endDate:date.format('DD/MM/YYYY')})
                }}
                format='DD/MM/YYYY'
              />
            </LocalizationProvider>
          </Box>

     {/*
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select Date Range</DialogTitle>
        
        <DialogContent>
          <Box>
            <InputLabel htmlFor="start-date">Start Date</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="start-date"
                value={startDate}
                onChange={(date) => setStartDate(date)}
                format='DD/MM/YYYY'
              />
            </LocalizationProvider>
          </Box>
          <Box mt={2}>
            <InputLabel htmlFor="end-date">End Date</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                id="end-date"
                value={endDate}
                onChange={(date) => setEndDate(date)}
                format='DD/MM/YYYY'
              />
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleApply}>Apply</Button>
        </DialogActions>
      </Dialog>
  */}
    </div>
  );
};
