import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import AvailabilityViewerWrapper from './components/AvailabilityViewerWrapper';
import axios from 'axios';


const MentorViewer = () => {
  const { token } = useParams();
  const [elementToken, setElementToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://api.dev.ceresa.com/api/v1/calendars/mentor-scheduler/${token}`,{ headers: { 'api-key': 'team@ceresa'}})
      .then(response => {
        //console.log('RESPONSE: ',JSON.stringify(response));
        setElementToken(response?.data?.data?.elementToken);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });

      //setElementToken(process.env.REACT_APP_ELEMENT_TOKEN);
      //setLoading(false);
  }, [token]);

  /*useEffect(() => {
    axios.post("https://api.cronofy.com/v1/element_tokens",
      {
      version: "1",
      permissions: ["availability"],
      subs: [token],
      origin: token === "apc_66baa129920f17390cd9974cx" ? "https://cronofy-poc.vercel.app" : "http://localhost:3000",
      },
      { headers: { Authorization: "Bearer CRN_vsYTVaMBtBLKkw8DC9YTCbu51Pu3xSQyK3K8LA" } })
      .then(response => {
        //console.log('RESPONSE: ',JSON.stringify(response));
        setElementToken(response?.data['element_token']?.token);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });

      //setElementToken(process.env.REACT_APP_ELEMENT_TOKEN);
      //setLoading(false);
  }, [token]);*/

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
          { start: "2024-08-26T09:00:00Z", end: "2024-08-15T17:00:00Z" },
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