import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import { Chip } from '@mui/material';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

export const Datetoggle = ({ query, setQuery }) => {
  const [dateFrom, setStartDate] = useState(null);
  const [dateTo, setEndDate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (query.startDate) {
      setStartDate(dayjs(query.dateFrom, 'DD/MM/YYYY'));
    }
    if (query.endDate) {
      setEndDate(dayjs(query.dateTo, 'DD/MM/YYYY'));
    }
  }, [query]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSelectDate = (date, type) => {
    if (type === 'start') {
      setStartDate(date);
      setQuery(prevQuery => ({ ...prevQuery, dateFrom: date ? date.format('DD/MM/YYYY') : '' }));
    } else if (type === 'end') {
      setEndDate(date);
      setQuery(prevQuery => ({ ...prevQuery, dateTo: date ? date.format('DD/MM/YYYY') : '' }));
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Chip label="Select Dates" onClick={handleOpenDialog} />
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Select Dates</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputLabel htmlFor="start-date">Start Date</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: '100%' }}
                  id="start-date"
                  disablePast
                  value={dateFrom}
                  onChange={(date) => handleSelectDate(date, 'start')}
                  format='DD/MM/YYYY'
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <InputLabel htmlFor="end-date">End Date</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ width: '100%' }}
                  id="end-date"
                  disablePast
                  minDate={dateFrom}
                  value={dateTo}
                  onChange={(date) => handleSelectDate(date, 'end')}
                  format='DD/MM/YYYY'
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleCloseDialog}>
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
