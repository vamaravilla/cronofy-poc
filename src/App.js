import React, { useState } from 'react';
import './App.css';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import AvailabilityRulesWrapper from './components/AvailabilityRulesWrapper';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = useState(1);

  const availabilityOptions = {
    element_token: process.env.REACT_APP_ELEMENT_TOKEN,
    target_id: "cronofy-availability-rules",
    availability_rule_id: process.env.REACT_APP_AVAILABILITY_RULE_ID,
    //demo: true,
    data_center: "us",
    config: {
      start_time: "08:00",
      end_time: "18:00",
      duration: 60
    },
    styles: {
        colors: {
            available: "#E2FAC8",
            unavailable: "#FFFFFF",
            primary: "#29A74E"
        },
        prefix: "Mentoring"
    },
    tzid: "America/Chicago"
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Calendar" {...a11yProps(0)} />
          <Tab label="Mentor" {...a11yProps(1)} />
          <Tab label="Mentee" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Create new Application Calendar
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="calendar-container">
          <div className="calendar-section left-section">
            <p>Accelerator</p>
          </div>
          <div className="calendar-section right-section">
            <AvailabilityRulesWrapper options={availabilityOptions} />
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Mentee Content
      </TabPanel>
    </Box>
  );
}

export default App;