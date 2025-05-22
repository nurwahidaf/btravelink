import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import LogoImage from './../assets/images/logoImage.png';

// halaman yang ditampilkan pada navbar ketika user belum login
const loggedOutPages = [
  { name: 'Beranda', path: '/' },
  { name: 'Paket Perjalanan', path: '/packages' }
];

// halaman yang ditampilkan pada navbar ketika user sudah login
const loggedInPages = [
  { name: 'Beranda', path: '/' },
  { name: 'Paket Perjalanan', path: '/packages' }, 
  { name: 'Riwayat Reservasi', path: '/reservations' },
];

// komponen navbar
const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ambil user dan fungsi logout dari context useAuth
  const [anchorElNav, setAnchorElNav] = useState(null); // state untuk menu navbar
  const [anchorElUser, setAnchorElUser] = useState(null); // state untuk menu user
  
  // menentukan halaman yang ditampilkan pada navbar berdasarkan status login user
  const pages = user ? loggedInPages : loggedOutPages;
  
  // fungsi untuk membuka dan menutup menu navbar
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  // fungsi untuk membuka dan menutup menu user
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  // fungsi untuk logout user
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logout: ', error);
    }
  };
  
  return (
    <AppBar position='static' color='#F7F7F8' sx={{ boxShadow: '2' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* logo */}
            <Link to='/'>
              <Box 
                component='img' src={LogoImage} alt='Logo bTravelink'
                sx={{ 
                  width: '160px',
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  mr: 2,
                }}
              />
            </Link>

            {/* tampilan menu di desktop */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.path);
                  }}
                  color='dark'
                  sx={{ display: 'block', fontWeight: 'bold', my: 2 }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          
          {/* tampilan menu di mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='menu'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
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

          {/* user menu */}
          {user && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open Menu'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.displayName || 'User'} src={user.photoURL || undefined} />
                </IconButton>
              </Tooltip>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                sx={{ mt: '45px' }}
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
