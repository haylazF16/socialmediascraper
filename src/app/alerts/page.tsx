'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

const AlertsPage = () => {
  const [open, setOpen] = useState(false);
  const [newAlert, setNewAlert] = useState({
    keywords: [],
    platforms: [],
    frequency: 'realtime',
    active: true,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'keywords', headerName: 'Keywords', width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {params.value.map((keyword: string) => (
            <Chip key={keyword} label={keyword} size="small" />
          ))}
        </Box>
      ),
    },
    { field: 'platforms', headerName: 'Platforms', width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          {params.value.map((platform: string) => (
            <Chip key={platform} label={platform} size="small" />
          ))}
        </Box>
      ),
    },
    { field: 'frequency', headerName: 'Frequency', width: 130 },
    {
      field: 'active',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => (
        <FormControlLabel
          control={
            <Switch
              checked={params.value}
              onChange={() => {}}
            />
          }
          label={params.value ? 'Active' : 'Inactive'}
        />
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      keywords: ['cosmetic surgery', 'price'],
      platforms: ['Instagram', 'Facebook'],
      frequency: 'realtime',
      active: true,
    },
    {
      id: 2,
      keywords: ['clinic review', 'recommendation'],
      platforms: ['X (Twitter)'],
      frequency: 'daily',
      active: true,
    },
  ];

  const handleCreateAlert = () => {
    // Implement alert creation logic here
    console.log(newAlert);
    handleClose();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Alerts</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Create Alert
        </Button>
      </Box>

      <Card>
        <CardContent>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            disableRowSelectionOnClick
          />
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Alert</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Keywords (comma separated)"
                onChange={(e) => setNewAlert({
                  ...newAlert,
                  keywords: e.target.value.split(',').map(k => k.trim()),
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Platforms</InputLabel>
                <Select
                  multiple
                  value={newAlert.platforms}
                  onChange={(e) => setNewAlert({
                    ...newAlert,
                    platforms: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
                  })}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {['Instagram', 'X (Twitter)', 'Facebook', 'LinkedIn'].map((platform) => (
                    <MenuItem key={platform} value={platform}>
                      {platform}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Frequency</InputLabel>
                <Select
                  value={newAlert.frequency}
                  onChange={(e) => setNewAlert({
                    ...newAlert,
                    frequency: e.target.value,
                  })}
                >
                  <MenuItem value="realtime">Real-time</MenuItem>
                  <MenuItem value="hourly">Hourly</MenuItem>
                  <MenuItem value="daily">Daily</MenuItem>
                  <MenuItem value="weekly">Weekly</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={newAlert.active}
                    onChange={(e) => setNewAlert({
                      ...newAlert,
                      active: e.target.checked,
                    })}
                  />
                }
                label="Active"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateAlert} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AlertsPage;