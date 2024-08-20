import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import AvailabilityViewerWrapper from './components/AvailabilityViewerWrapper';
import axios from 'axios';


const MentorViewer = () => {
  const { token } = useParams();
  const [elementToken, setElementToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://api.dev.ceresa.com/api/v1/calendars/mentor-scheduler/${token}`,{ headers: { 'api-key': 'team@ceresa'}})
      .then(response => {
        //console.log('RESPONSE: ',response?.data?.data?.elementToken);
        setElementToken(response?.data?.data?.elementToken);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });

  }, [token]);


  const today = new Date();
  const viewerOptions = {
    element_token: elementToken,
    target_id: "cronofy-availability-viewer",
    availability_query: {
        participants: [
            {
                required: "all",
                members: [
                    { sub: token},
                ]
            }
        ],
        required_duration: { minutes: 90 },
        query_periods: [
          { start: `${today.toISOString().split('T')[0]}T12:00:00Z`, end: "2024-08-30T17:00:00Z" },
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

 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="calendar-container">
        <div className="calendar-section left-section">
        <p>Accelerator</p>
        <p>Mentor Instructions...</p>
        </div>
        <div className="calendar-section right-section">
          <AvailabilityViewerWrapper options={viewerOptions} />
        </div>
    </div>
  );
};

export default MentorViewer;