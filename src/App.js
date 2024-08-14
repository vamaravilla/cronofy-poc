import React, { useState } from 'react';
import './App.css';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import AvailabilityRulesWrapper from './components/AvailabilityRulesWrapper';
import DateTimePickerWrapper from './components/DateTimePickerWrapper';
import AgendaWrapper from './components/AgendaWrapper';
import AvailabilityViewerWrapper from './components/AvailabilityViewerWrapper';
//import { GlobalContext } from './GlobalContext';

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
  const [value, setValue] = useState(0);
  //const { globalData } = useContext(GlobalContext);

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
    tzid: "America/New_York",
    callback: notification => console.log("callback", notification),
  };

  const dateTimePickerOptions = {
    element_token: process.env.REACT_APP_ELEMENT_TOKEN2,
    target_id: "cronofy-date-time-picker",
    availability_query: {
      participants: [
          {
              required: "all",
              members: [
                  { sub: "apc_66b294d43a643e10d86ecba8", managed_availability: true },
              ]
          }
      ],
      required_duration: { minutes: 60 },
      query_periods: [
          { start: "2024-08-08T08:00:00Z", end: "2024-08-30T17:00:00Z" },
      ]
    },
    styles: {
        prefix: "custom-name"
    },
    config: {
      mode: "confirm" // no_confirm
    },
    //callback: notification => console.log("callback", notification),
    tzid: "America/New_York"
  };

  const agendaOptions = {
    element_token: process.env.REACT_APP_ELEMENT_TOKEN3,
     target_id: "cronofy-agenda"
  }

  const viewerOptions = {
    element_token: process.env.REACT_APP_ELEMENT_TOKEN2,
    target_id: "cronofy-availability-viewer",
    availability_query: {
        participants: [
            {
                required: "all",
                members: [
                    { sub: "apc_66baa129920f17390cd9974c" },
                ]
            }
        ],
        required_duration: { minutes: 90 },
        query_periods: [
          { start: "2024-08-15T09:00:00Z", end: "2024-08-15T17:00:00Z" },
        ],
    },
    config: {
        start_time: "08:00",
        end_time: "18:00",
        interval:30,
        mode: "free_select"
    },
    styles: {
        prefix: "custom-name"
    },
    callback: notification => console.log("callback", notification),
    tzid: "America/New_York"
  }

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
          <Tab label="Viewer" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>

      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="calendar-container">
          <div className="calendar-section left-section">
            <AgendaWrapper options={agendaOptions} />
          </div>
          <div className="calendar-section right-section">
            <AvailabilityRulesWrapper options={availabilityOptions} />
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="calendar-container">
          <div className="calendar-section left-section">
            <p>Accelerator</p>
          </div>
          <div className="calendar-section right-section">
            <DateTimePickerWrapper options={dateTimePickerOptions} />
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div className="calendar-container">
          <div className="calendar-section left-section">
            <p>Accelerator</p>
          </div>
          <div className="calendar-section right-section">
            <AvailabilityViewerWrapper options={viewerOptions} />
          </div>
        </div>
      </TabPanel>
    </Box>
  );
}

export default App;