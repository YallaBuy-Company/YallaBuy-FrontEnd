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
import { data } from 'autoprefixer';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

const url = "http://localhost/:3000/";


function LoginSignupPopup() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // 0 for Login, 1 for Signup
  const [userEmail , setEmail]= useState('');
  const [fullname , setfullname]= useState('');
  const [age , setage]= useState('');
  const [password , setpassword]= useState('');
  const [repatpass , setrepatpass]= useState('');
  const [faveteam , setfaveteam]= useState('');
  // const [teams, setTeams] = useState([]);


  // eslint-disable-next-line no-undef
  // useEffect(() => {
  //   // Fetch teams from the API
  //   axios.get(url+'/teams/')
  //     .then(response => {
  //       setTeams(response.data);
  //     })
  //     .catch(error => {
  //       console.error('There was an error fetching the teams!', error);
  //     });
  // }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeTab = (event, newActiveTab) => {
    setActiveTab(newActiveTab);
  };

  const handleDetails = () => {
    const userData = {
      userEmail,
      password,
      ...(activeTab === 1 && { repatpass, fullname, age , faveteam })
    };

    if(activeTab === 1){
      alert(userData.fullname);
    }


    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };
  
    // Perform validations
    if (!userEmail || !password || (activeTab === 1 && (!repatpass || !fullname || !age))) {
      alert("Please fill in all required fields.");
      return;
    }
  
    if (!validateEmail(userEmail)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    if (password.length < 6) {
      alert("Password should be at least 6 characters long.");
      return;
    }
  
    if (activeTab === 1 && password !== repatpass) {
      alert("Passwords do not match.");
      return;
    }
  
    if (activeTab === 1 && (isNaN(age) || age <= 0 || age > 120)) {
      alert("Please enter a valid age.");
      return;
    }

    // const endpoint = activeTab === 0 ? '/auth/login' : '/auth/signup';

    // Send userData to the server
    // fetch(`${url}auth/${endpoint}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(userData),
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     console.log('Success:', data);
    //     // Handle success response from server
    //   })
    //   .catch(error => {
    //     console.error('Error:', error);
    //     // Handle errors
    //   });
  };
 
  

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Login
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
            value={fullname}
            onChange={(e) => setfullname(e.target.value)}

            />)}

            {activeTab === 1 && (
                          <TextField 
                          margin="dense"
                          label="Age"
                          type="number"
                          fullWidth
                          value={age}
                          onChange={(e) => setage(e.target.value)}
                          />         
            )}
            {activeTab === 1 && (

              <Autocomplete
                options={teams}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Favorite Team"
                    margin="dense"
                    fullWidth
                  />
                )}
                value={faveteam}
                onChange={(event, newValue) => setfaveteam(newValue)}
              />
            )}


          <TextField
            autoFocus
            margin="dense"
            label="Username/Email"
            type={activeTab === 0 ? "text" : "email"}
            fullWidth
            value={userEmail}
            onChange={(e) => setEmail(e.target.value)}
          />

            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth   
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            />

          {activeTab === 1 && (
            <TextField
            margin="dense"
            label="Repeat password"
            type="password"
            fullWidth
            value={repatpass}
            onChange={(e) => setrepatpass(e.target.value)}
          />
          )}

          
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {activeTab === 0 && (
            <Button variant="contained" onClick ={handleDetails}>Login</Button>
          )}
          {activeTab === 1 && (
            <Button variant="contained" onClick ={handleDetails}>Signup</Button>
          )}
        </DialogActions>

      </Dialog>
    </>
  );
}

export default LoginSignupPopup;
