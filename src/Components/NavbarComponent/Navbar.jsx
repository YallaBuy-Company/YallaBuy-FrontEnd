import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LoginSignupPopup from '../LoginSignupPopup';
import { UserContext } from '../UserContext';
import { Freeinput } from '../Freeinput';
import { Datetoggle } from '../Datetoggle';
import { Locationinput } from '../Locationinput';
import dayjs from 'dayjs';
import Logo from '../Logo'; // Import the Logo component

const settings = ['Account', 'Logout'];

export const Navbar = () => {
  const [queryState, setQuery] = useState({
    dateFrom: '',
  });
  const { userMode } = useContext(UserContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearch = () => {
    let updatedQueryState = { ...queryState };
  
    if (!queryState.dateFrom) {
      const today = dayjs().format('DD/MM/YYYY');
      updatedQueryState = { ...updatedQueryState, dateFrom: today };
      setQuery(updatedQueryState); // Update state with the new start date
    }
  
    const searchParams = new URLSearchParams(updatedQueryState).toString();
    navigate(`/search?${searchParams}`);
  };

  return (
    <AppBar position="sticky" enableColorOnDark color="default" sx={{ maxHeight: '100px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid xs={2} item>
              <Logo /> {/* Use the Logo component here */}
            </Grid>

            <Grid item xs={8}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Grid container spacing={2} alignItems="center" >
                    <Grid item>
                      <Freeinput query={queryState} setQuery={setQuery} />
                    </Grid>
                    <Grid item>
                      <Button
                        key={"Search"}
                        onClick={handleSearch}
                        sx={{ color: 'black', border: "solid" }}
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Datetoggle query={queryState} setQuery={setQuery} />
                    </Grid>
                    <Grid item>
                      <Locationinput query={queryState} setQuery={setQuery} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              {userMode === 'guest' ? <LoginSignupPopup /> :
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Profile">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Link to={'/' + setting}>
                          <Typography textAlign="center">
                            {setting}
                          </Typography>
                        </Link>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              }
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
