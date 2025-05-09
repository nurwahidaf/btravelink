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
import LogoImage from './../assets/images/logoImage.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const loggedOutPages = [
  { name: 'Paket Perjalanan', path: '/packages' }
];

const loggedInPages = [
  { name: 'Paket Perjalanan', path: '/packages' }, 
  { name: 'Riwayat Reservasi', path: '/reservations' },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logout: ', error);
    }
  };
  
  const pages = user ? loggedInPages : loggedOutPages;
  
  const handleOpenNavMenu = (event) => {
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
    <AppBar position="static" color='#F7F7F8' sx={{ boxShadow: '2' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Logo */}
            <Link to='/'>
              <Box 
                component='img'
                src={LogoImage}
                alt='Logo bTravelink'
                sx={{ 
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  width: '160px',
                  mr: 2,
                }}
              />
            </Link>

            {/* Tampilan menu di desktop */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.path);
                  }}
                  color='dark'
                  sx={{ my: 2, fontWeight: 'bold', display: 'block' }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          
          {/* Tampilan menu di mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.path);
                  }}
                >
                  <Typography textAlign='center'>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* User menu */}
          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open Menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.displayName || 'User'} src={user.photoURL || undefined} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem sx={{ pointerEvents: 'none' }}>
                  <Typography textAlign='center'>Hai, {user.displayName || 'User Name'}! 👋</Typography>
                </MenuItem>
                <MenuItem sx={{ pointerEvents: 'none' }}>
                  <Typography textAlign='center'>{user.email || 'User Email'}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign='center'>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
