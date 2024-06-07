import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
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
import { Freeinput } from '../Freeinput';
import { Datetoggle } from '../Datetoggle';
import { Locationinput } from '../Locationinput';
import dayjs from 'dayjs';
import Logo from '../Logo'; // Import the Logo component
import { Menu } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

export const Navbar = () => {
  const [queryState, setQuery] = useState({ dateFrom: '' });
  const { userMode, setUserMode, user } = useContext(UserContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  // Extract initials from fullName or email
  const getInitials = () => {
    if (user?.fullName) {
      const names = user.fullName.split(' ');
      return names.map(name => name[0]).join('').toUpperCase();
    }
    return user?.email?.slice(0, 2).toUpperCase() || 'N'; // Default to 'N'
  };

  const initials = getInitials();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('authToken');

    // Update user mode state in UserContext
    setUserMode('guest');
    handleCloseUserMenu();
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
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Freeinput query={queryState} setQuery={setQuery} />
                    </Grid>
                    <Grid item>
                      <Button
                        key="Search"
                        onClick={handleSearch}
                        sx={{ color: 'black', border: 'solid' }}
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
                      <Avatar sx={{ bgcolor: deepOrange[500] }}>{initials}</Avatar>
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
                    <MenuItem key="Logout" onClick={handleCloseUserMenu}>
                      <Button variant="contained" color="error" onClick={handleLogout} sx={{ fontSize: '14px' }}>
                        Logout
                      </Button>
                    </MenuItem>
                    <MenuItem key="settings" onClick={handleCloseUserMenu}>
                      <Link to="/settings">
                        <Typography textAlign="center">
                          Settings
                        </Typography>
                      </Link>
                    </MenuItem>
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
