import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
  
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleMobileMenu = (event) => setMobileAnchorEl(event.currentTarget);
  
  const handleClose = () => {
    setAnchorEl(null);
    setMobileAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => handleNavigation('/')}
        >
          Advanced AI Brain Tumor Detection
        </Typography>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" onClick={() => handleNavigation('/')} sx={{
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(144, 238, 144, 0.2)',
              transform: 'translateY(-2px)'
            }
          }}>
            Home
          </Button>
          <Button color="inherit" onClick={() => handleNavigation('/contact')} sx={{
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(144, 238, 144, 0.2)',
              transform: 'translateY(-2px)'
            }
          }}>
            Contact
          </Button>
          <Button color="inherit" onClick={() => handleNavigation('/feedback')} sx={{
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(144, 238, 144, 0.2)',
              transform: 'translateY(-2px)'
            }
          }}>
            Feedback
          </Button>
          <IconButton
            size="large"
            color="inherit"
            onClick={handleMenu}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleNavigation('/login')}>Login</MenuItem>
            <MenuItem onClick={() => handleNavigation('/register')}>Register</MenuItem>
          </Menu>
        </Box>

        {/* Mobile Menu */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            color="inherit"
            onClick={handleMobileMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={mobileAnchorEl}
            open={Boolean(mobileAnchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleNavigation('/')}>Home</MenuItem>
            <MenuItem onClick={() => handleNavigation('/contact')}>Contact</MenuItem>
            <MenuItem onClick={() => handleNavigation('/feedback')}>Feedback</MenuItem>
            <MenuItem onClick={() => handleNavigation('/login')}>Login</MenuItem>
            <MenuItem onClick={() => handleNavigation('/register')}>Register</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
