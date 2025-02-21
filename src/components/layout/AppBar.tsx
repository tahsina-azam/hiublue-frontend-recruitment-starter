'use client';

import { useState } from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ProfileImage from '../common/ProfileImage';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from 'context/authContext'; 

interface AppBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

export default function AppBar({ open, handleDrawerOpen }: AppBarProps) {
  const { logout } = useAuth(); // Function to log out the user

  // State for profile menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  // Handle profile menu toggle
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MuiAppBar
      sx={{
        bgcolor: 'white',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Adds shadow below AppBar
      }}
      position="fixed"
    >
      <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Menu Icon (Hidden when Sidebar is open) */}
        {!open && (
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ color: 'black' }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Profile Image (Aligned to Right) */}
        <Box sx={{ marginLeft: 'auto' }}>
          <IconButton onClick={handleProfileClick}>
            <ProfileImage src="/pic.png" size={40} />
          </IconButton>

          {/* Logout Menu */}
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                logout(); // Call logout function
              }}
            >
            <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}
