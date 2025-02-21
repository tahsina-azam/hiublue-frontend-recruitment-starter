


import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { Card, CardContent, Typography } from '@mui/material';
import { useAuth } from 'context/authContext';
import { ApexOptions } from 'apexcharts'; // Import ApexOptions
import { useMediaQuery, useTheme } from '@mui/material';

interface ChartData {
  series: { name: string; data: number[]; color?: string }[];
  categories: string[];
}

const OffersSentChart = () => {
  const { token } = useAuth();
  const [chartData, setChartData] = useState<ChartData>({
    series: [],
    categories: [],
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check for small screen

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://dummy-1.hiublue.com/api/dashboard/stat?filter=this-week',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();

        if (!data.offers_sent) return;

        const offersSent = data.offers_sent as Record<string, number>;
        const days = Object.keys(offersSent);
        const offersData = days.map((day) => offersSent[day]);

        const shortDays = days.map((day) => day.slice(0, 3));

        setChartData({
          series: [{ name: 'Offers Sent', data: offersData, color: '#000' }],
          categories: shortDays,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  // Explicitly type 'options' as ApexOptions
  const options: ApexOptions = {
    chart: {
      type: 'line',
      height: isSmallScreen ? 250 : 318, // Adjust height for small screens
      width: '100%',
    },
    stroke: { curve: 'smooth', width: 2, colors: ['#000'] },
    xaxis: { categories: chartData.categories },
    yaxis: { title: { text: 'Offers Sent' } },
    tooltip: { y: { formatter: (val: number) => `${val} offers` } },
  };

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Offers Sent
        </Typography>
        <div style={{ width: '100%', height: isSmallScreen ? '250px' : '310px' }}>
          <ApexCharts
            options={options}
            series={chartData.series}
            type="line"
            height={isSmallScreen ? 250 : 318} // Set height based on screen size
            width="100%" // Make chart width 100% to be responsive
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default OffersSentChart;
