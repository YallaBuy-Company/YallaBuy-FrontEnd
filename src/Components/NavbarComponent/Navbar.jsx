import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Generalsearch } from '../Generalsearch'
import LoginSignupPopup from '../LoginSignupPopup';
import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import SvgIcon from '@mui/material/SvgIcon';
import { Freeinput } from '../Freeinput';
import { Datetoggle } from '../Datetoggle';
import { Locationinput } from '../Locationinput';

const pages = ['Teams', 'Date', 'Location'];
const settings = ['Account', 'Logout'];



export const Navbar = () => {

  const { userMode } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  
  const handleOpenMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" enableColorOnDark color='default'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
        <img src='./src\assets\smallLogo.svg'></img>
          </Link>

          <Box sx={{paddingRight:"50%" ,justifyContent: "center", flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Box sx={{flexGrow:0 }}>
            <Button
                key={"Teams"}
                onClick={handleOpenMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                Search
              </Button>
              <Menu
              id="menu-search"
              sx={{display:"flex"}}
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <MenuItem key={"Teams-item"}>
              <Freeinput/>
              </MenuItem>
              <MenuItem key={"Date-items"}>
              <Datetoggle></Datetoggle>
              </MenuItem>
              <MenuItem key={"Location item"}>
              <Locationinput></Locationinput>
              </MenuItem>
            </Menu>
            </Box>

          </Box>
          
          {userMode === 'guest' ? <LoginSignupPopup/> :
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
                    <Link to={'/'+setting}>
                  <Typography textAlign="center">
                    {setting}
                    </Typography>
                    </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
