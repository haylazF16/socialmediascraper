'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { Line } from 'react-chartjs-2';

const ReportsPage = () => {
  const [reportType, setReportType] = useState('engagement');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Engagement Rate',
        data: [65, 59, 80, 81],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Lead Score',
        data: [28, 48, 40, 19],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  const handleExport = (format: 'excel' | 'pdf') => {
    // Implement export logic here
    console.log(`Exporting as ${format}`);
  };

  const handleShare = () => {
    // Implement share logic here
    console.log('Sharing report');
  };

  const metrics = [
    {
      title: 'Total Mentions',
      value: '2,345',
      change: '+15%',
      positive: true,
    },
    {
      title: 'Average Sentiment',
      value: '7.8',
      change: '+5%',
      positive: true,
    },
    {
      title: 'Lead Conversion',
      value: '12%',
      change: '-2%',
      positive: false,
    },
    {
      title: 'Engagement Rate',
      value: '3.4%',
      change: '+8%',
      positive: true,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Reports</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => handleExport('excel')}
          >
            Export Excel
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => handleExport('pdf')}
          >
            Export PDF
          </Button>
          <Button
            variant="contained"
            startIcon={<ShareIcon />}
            onClick={handleShare}
          >
            Share
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <FormControl fullWidth>
            <InputLabel>Report Type</InputLabel>
            <Select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <MenuItem value="engagement">Engagement Analysis</MenuItem>
              <MenuItem value="sentiment">Sentiment Analysis</MenuItem>
              <MenuItem value="leads">Lead Generation</MenuItem>
              <MenuItem value="competitors">Competitor Analysis</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange({ ...dateRange, start: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange({ ...dateRange, end: e.target.value })
                }
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Grid>

        {metrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.title}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {metric.title}
                </Typography>
                <Typography variant="h4">{metric.value}</Typography>
                <Typography
                  color={metric.positive ? 'success.main' : 'error.main'}
                  variant="body2"
                >
                  {metric.change}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Trend Analysis
              </Typography>
              <Box sx={{ height: 400 }}>
                <Line
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportsPage;