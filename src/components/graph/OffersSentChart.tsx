import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { Card, CardContent, Typography } from '@mui/material';

const OffersSentChart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    categories: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://dummy-1.hiublue.com/api/dashboard/stat?filter=this-week',
          {
            headers: { Authorization: `Bearer fake-jwt-token` }, // Using fake token as requested
          }
        );
        const data = await response.json();

        // Extracting offers sent data
        const offersSent = data.offers_sent;
        const days = Object.keys(offersSent);
        const offersData = days.map((day) => offersSent[day]);

        // Convert full day names to 3-letter format (Mon, Tue, ...)
        const shortDays = days.map((day) => day.slice(0, 3));

        // Set chart data
        setChartData({
          series: [{ name: 'Offers Sent', data: offersData, color: '#000' }], // Black Line
          categories: shortDays,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: { type: 'line', height: 318, width: 500 },
    stroke: { curve: 'smooth', width: 2, colors: ['#000'] }, // Smooth black line
    xaxis: { categories: chartData.categories },
    yaxis: { title: { text: 'Offers Sent' } },
    tooltip: { y: { formatter: (val) => `${val} offers` } },
  };

  return (
    <Card sx={{ width: '555px' }}>
      <CardContent>
        <Typography variant="h4" fontWeight="bold">
          Offers sent
        </Typography>
        <div style={{ width: '528px', height: '318px' }}>
          <ApexCharts
            options={options}
            series={chartData.series}
            type="line"
            height={318}
            width={528}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default OffersSentChart;
