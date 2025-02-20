'use client';

import { AppBar as MuiAppBar, Toolbar, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ProfileImage from '../common/ProfileImage';

interface AppBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

export default function AppBar({ open, handleDrawerOpen }: AppBarProps) {
  return (
    <MuiAppBar sx={{ bgcolor: 'white' }} position="fixed">
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
          <ProfileImage src="/pic.png" size={40} />
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
}
