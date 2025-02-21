'use client';

import { Drawer, List, IconButton } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Image from 'next/image';
import SidebarItem from '../common/SidebarItem';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

interface SidebarProps {
  open: boolean;
  handleDrawerClose: () => void;
}

export default function Sidebar({ open, handleDrawerClose }: SidebarProps) {
  const theme = useTheme();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      {/* Sidebar Header with Logo & Close Button */}
      <DrawerHeader>
        <IconButton>
          <Image src="/logo.png" alt="Brand Logo" width={48} height={48} />
        </IconButton>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>

      {/* Sidebar Menu Items */}
      <List>
        <SidebarItem text="OVERVIEW" icon={null} link="/dashboard" />
        <SidebarItem text="Dashboard" icon="/clock.png" link="/dashboard"  />
        <SidebarItem text="Onboarding" icon="/shopping.png" link="/onboarding" />
      </List>
    </Drawer>
  );
}
