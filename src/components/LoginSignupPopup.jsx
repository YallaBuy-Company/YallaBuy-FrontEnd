import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function LoginSignupPopup() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // 0 for Login, 1 for Signup

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeTab = (event, newActiveTab) => {
    setActiveTab(newActiveTab);
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Login/Signup
      </Button>
      <Dialog open={open} onClose={handleClose}>

        <DialogTitle>
          {activeTab === 0 ? 'Login' : 'Signup'}
        </DialogTitle>

        <DialogContent>

          <Tabs value={activeTab} onChange={handleChangeTab}>
            <Tab label="Login" />
            <Tab label="Signup" />
          </Tabs>

          {activeTab === 0 && (
            <DialogContentText>
              Please enter your login credentials.
            </DialogContentText>
          )}

          {activeTab === 1 && (
            <DialogContentText>
              Please enter your details to create a new account.
            </DialogContentText>,

            <TextField
            autoFocus
            margin="dense"
            label="Full Name"
            type="text"
            fullWidth
            />,
            <TextField 
            margin="dense"
            label="Age"
            type="number"
            fullWidth
            />
          )}

          <TextField
            autoFocus
            margin="dense"
            label="Username/Email"
            type={activeTab === 0 ? "text" : "email"}
            fullWidth
          />

            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
            />

          {activeTab === 1 && (
            <TextField
            margin="dense"
            label="Repeat password"
            type="password"
            fullWidth
          />
          )}

          
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {activeTab === 0 && (
            <Button variant="contained">Login</Button>
          )}
          {activeTab === 1 && (
            <Button variant="contained">Signup</Button>
          )}
        </DialogActions>

      </Dialog>
    </>
  );
}

export default LoginSignupPopup;
