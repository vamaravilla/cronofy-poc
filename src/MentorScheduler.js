import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import DateTimePickerWrapper from './components/DateTimePickerWrapper';
import axios from 'axios';

const MentorScheduler = () => {
  const { token } = useParams();
  const [elementToken, setElementToken] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const today = new Date();
  today.setDate(today.getDate()+1);
  const dateTimePickerOptions = {
    element_token: elementToken,
    target_id: "cronofy-date-time-picker",
    availability_query: {
      participants: [
          {
              required: "all",
              members: [
                  { sub: token, managed_availability: true },
              ]
          }
      ],
      required_duration: { minutes: 90 },
      query_periods: [
          { start: `${today.toISOString().split('T')[0]}T12:00:00Z`, end: "2024-08-30T17:00:00Z" },
      ]
    },
    styles: {
        prefix: "custom-name"
    },
    config: {
      mode: "confirm" // no_confirm
    },
    tzid: "America/New_York",
    callback: (notification) => {
      console.log('Notification: ', notification);
      if(notification.notification.type === "slot_selected"){
        console.log('start: ',notification.notification.slot.start);
        console.log('end: ',notification.notification.slot.end);
        console.log('tzid: ',notification.notification.tzid);
        console.log('calendarId: ',token);

        const body = {
          start: notification.notification.slot.start,
          end: notification.notification.slot.end,
          tzid: notification.notification.tzid,
          calendarId: token,
        }

        axios.post(`https://api.dev.ceresa.com/api/v1/calendars/schedule-event`,body,{ headers: { 'api-key': 'team@ceresa'}})
        .then(response => {
          window.location.reload(); 
        })
        .catch(error => {
          console.log('Error: ',error);
          //setError(error);
          //setLoading(false);
        });

      }
    },
  };

 

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
        <p>Mentee Instructions...</p>
        </div>
        <div className="calendar-section right-section">
          <DateTimePickerWrapper options={dateTimePickerOptions} />
        </div>
    </div>
  );
};

export default MentorScheduler;