import { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Toolbar,
  Divider,
  Collapse,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Search as SearchIcon,
  Notifications as AlertsIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const drawerWidth = 240;

const Sidebar = () => {
  const router = useRouter();
  const [filterOpen, setFilterOpen] = useState(false);

  const handleFilterClick = () => {
    setFilterOpen(!filterOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Search', icon: <SearchIcon />, path: '/search' },
    { text: 'Alerts', icon: <AlertsIcon />, path: '/alerts' },
    { text: 'Reports', icon: <ReportsIcon />, path: '/reports' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => router.push(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}

        <Divider sx={{ my: 2 }} />

        <ListItemButton onClick={handleFilterClick}>
          <ListItemIcon>
            <FilterIcon />
          </ListItemIcon>
          <ListItemText primary="Filters" />
          {filterOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={filterOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary="Date Range" />
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary="Platforms" />
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary="Sentiment" />
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary="Location" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
};

export default Sidebar;