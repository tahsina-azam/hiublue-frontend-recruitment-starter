'use client';

import { useEffect, useState } from 'react';
import { Box, Grid, CircularProgress, Typography } from '@mui/material';
import DashboardCard from '../common/DashboardCard';
import { useAuth } from 'context/authContext';

interface DashboardData {
  active_users: number;
  clicks: number;
  appearance: number;
}

export default function CardView() {
  const [currentData, setCurrentData] = useState<DashboardData | null>(null);
  const [previousData, setPreviousData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token, login } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://dummy-1.hiublue.com/api/dashboard/summary?filter=this-week',
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer fake-jwt-token`, // Replace with actual token
              'Content-Type': 'application/json'
            }
          }
        );
  
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setCurrentData(result.current);
        setPreviousData(result.previous);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : (
        <Grid container rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center" alignItems="center" sx={{ flexDirection: { xs: 'column', sm: 'row' }, marginTop:"10px" }}>
            
          <DashboardCard 
            title="Total Active Users" 
            value={currentData?.active_users ?? 0} 
            change={calculateChange(currentData?.active_users ?? 0, previousData?.active_users ?? 0)} 
          />
          <DashboardCard 
            title="Total Clicks" 
            value={currentData?.clicks ?? 0} 
            change={calculateChange(currentData?.clicks ?? 0, previousData?.clicks ?? 0)} 
          />
          <DashboardCard 
            title="Total Appearances" 
            value={currentData?.appearance ?? 0} 
            change={calculateChange(currentData?.appearance ?? 0, previousData?.appearance ?? 0)} 
          />
        </Grid>
      )}
    </Box>
  );
}
