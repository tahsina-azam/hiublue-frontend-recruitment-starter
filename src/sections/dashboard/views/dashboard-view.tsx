'use client';

import { Box, CssBaseline, Typography } from '@mui/material';
import { useState } from 'react';
import AppBar from '@/components/layout/AppBar';
import Sidebar from '@/components/layout/SideBar';
import SelectItems from '@/components/common/SelectItem';
import CardView from '@/components/layout/CardView';
import OffersTable from '@/components/common/OffersTable';
import dynamic from 'next/dynamic';

const drawerWidth = 240; // Ensure the drawer width is consistent

// Dynamically import the OffersSentChart component with SSR disabled
const OffersSentChart = dynamic(() => import('../../../components/graph/OffersSentChart'), {
  ssr: false, // Disable SSR for this component
});

const WebsiteVisitChart = dynamic(() => import('../../../components/graph/WebsiteVisitChart'), {
  ssr: false, // Disable SSR for this component
});

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
          display: 'flex',
          justifyContent: 'center', // Center horizontally

          width: '100%', // Ensure it takes the full width

          mt: '64px', // Adjust for AppBar height
         
          p: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%', // Make sure it's 100% of the available space
            maxWidth: '1170px', // Optional: limit max width
          }}
        >
          <Typography variant="h4" color="text.primary">
            Dashboard
          </Typography>
          <SelectItems />
        </Box>
      </Box>
      <CardView />
      {/* Charts Section: Side by Side */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: '150px', sm: '50px' },
          flexWrap: 'wrap', // Makes it responsive
          mt: 4,
          mb: 20,
        }}
      >
        <Box sx={{ width: { xs: '100%', sm: '555px' }, height: '318px' }}>
          <WebsiteVisitChart />
        </Box>
        <Box sx={{ width: { xs: '100%', sm: '555px' }, height: '318px' }}>
          <OffersSentChart />
        </Box>
      </Box>
      <Box sx={{ paddingBottom: 4 }}>
        <OffersTable />
      </Box>
    </Box>
  );
}
