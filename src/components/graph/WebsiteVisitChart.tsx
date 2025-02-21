import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { Card, CardContent, Typography } from '@mui/material';
import { useAuth } from 'context/authContext';

const WeeklyWebsiteVisitsChart = () => {
  const {token} = useAuth();
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
            headers: { Authorization: `Bearer ${token}` }, // Replace with actual token
          }
        );
        const data = await response.json();

        // Extracting website visits
        const websiteVisits = data.website_visits;
        const days = Object.keys(websiteVisits);
        const desktopVisits = days.map((day) => websiteVisits[day].desktop);
        const mobileVisits = days.map((day) => websiteVisits[day].mobile);

        // Convert full names to 3-letter format (Mon, Tue, ...)
        const shortDays = days.map((day) => day.slice(0, 3));

        // Setting Chart Data
        setChartData({
          series: [
            { name: 'Desktop Visits', data: desktopVisits, color: '#28a745' }, // Green
            { name: 'Mobile Visits', data: mobileVisits, color: '#ffc107' }, // Yellow
          ],
          categories: shortDays,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: { type: 'bar', height: 318, width: 528 },
    plotOptions: {
      bar: { horizontal: false, columnWidth: '20px', borderRadius: 5 },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: { categories: chartData.categories },
    yaxis: { title: { text: 'Visits' } },
    fill: { opacity: 1 },
    tooltip: { y: { formatter: (val) => `${val} visits` } },
  };

  return (
    <Card sx={{ width: '555px' }}>
      <CardContent>
        {' '}
        <Typography variant="h4" fontWeight="bold">
          Website visits
        </Typography>
        <div style={{ width: '528px', height: '318px' }}>
          <ApexCharts
            options={options}
            series={chartData.series}
            type="bar"
            height={318}
            width={528}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyWebsiteVisitsChart;
