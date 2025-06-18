'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

const SettingsPage = () => {
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({
    instagram: false,
    twitter: false,
    facebook: false,
    salesforce: false,
    hubspot: false,
  });

  const [settings, setSettings] = useState({
    instagram_api_key: '',
    twitter_api_key: '',
    facebook_api_key: '',
    salesforce_api_key: '',
    hubspot_api_key: '',
    email_notifications: true,
    real_time_alerts: true,
    data_retention_days: '30',
    export_format: 'xlsx',
    language: 'en',
  });

  const handleToggleShowSecret = (field: string) => {
    setShowSecrets(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSave = () => {
    // Implement settings save logic here
    console.log('Saving settings:', settings);
  };

  const apiKeyFields = [
    { name: 'instagram_api_key', label: 'Instagram API Key' },
    { name: 'twitter_api_key', label: 'X (Twitter) API Key' },
    { name: 'facebook_api_key', label: 'Facebook API Key' },
    { name: 'salesforce_api_key', label: 'Salesforce API Key' },
    { name: 'hubspot_api_key', label: 'HubSpot API Key' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                API Connections
              </Typography>
              <Alert severity="info" sx={{ mb: 3 }}>
                Securely manage your API keys for different platforms.
              </Alert>
              <Grid container spacing={3}>
                {apiKeyFields.map((field) => (
                  <Grid item xs={12} md={6} key={field.name}>
                    <TextField
                      fullWidth
                      label={field.label}
                      value={settings[field.name as keyof typeof settings]}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          [field.name]: e.target.value,
                        })
                      }
                      type={showSecrets[field.name.split('_')[0]] ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() =>
                                handleToggleShowSecret(field.name.split('_')[0])
                              }
                              edge="end"
                            >
                              {showSecrets[field.name.split('_')[0]] ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Notifications
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.email_notifications}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            email_notifications: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Email Notifications"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.real_time_alerts}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            real_time_alerts: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Real-time Alerts"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Data Management
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Data Retention (days)"
                    type="number"
                    value={settings.data_retention_days}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        data_retention_days: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Default Export Format"
                    select
                    value={settings.export_format}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        export_format: e.target.value,
                      })
                    }
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="xlsx">Excel (XLSX)</option>
                    <option value="csv">CSV</option>
                    <option value="pdf">PDF</option>
                  </TextField>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              size="large"
            >
              Save Settings
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage;