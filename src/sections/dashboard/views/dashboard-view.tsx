'use client';

import { Box, CssBaseline, Typography } from '@mui/material';
import { useState } from 'react';
import AppBar from '@/components/layout/AppBar';
import Sidebar from '@/components/layout/SideBar';
import SelectItems from '@/components/common/SelectItem';
import CardView from '@/components/layout/CardView';
import WebsiteVisitChart from '@/components/graph/WebsiteVisitChart';
import OffersSentChart from '@/components/graph/OffersSentChart';

const drawerWidth = 240; // Ensure the drawer width is consistent

export default function DashboardView() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box >
      <CssBaseline />
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          display:"flex",
          justifyContent:"space-between",
          flexGrow: 1,
          ml: open ? `${drawerWidth}px` : 0, 
          mt: '64px',
          p: 3, 
        }}
      >
        <Typography variant="h4" color="text.primary">
          Dashboard
        </Typography>
        <SelectItems/>
      </Box>
      <CardView/>
      {/* Charts Section: Side by Side */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap', // Makes it responsive
          mt: 4,
        }}
      >
        <Box sx={{ width: { xs: '100%', sm: '555px' }, height: '318px' }}>
          <WebsiteVisitChart />
        </Box>
        <Box sx={{ width: { xs: '100%', sm: '555px' }, height: '318px' }}>
          <OffersSentChart />
        </Box>
      </Box>
    </Box>
  );
}
