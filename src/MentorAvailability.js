import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';
import AvailabilityRulesWrapper from './components/AvailabilityRulesWrapper';
import axios from 'axios';
import AgendaWrapper from './components/AgendaWrapper';

const MentorAvailability = () => {
  const { token } = useParams();
  const [elementToken, setElementToken] = useState(null);
  const [availabilityRuleId, setAvailabilityRuleId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [elementToken2, setElementToken2] = useState(null);

  useEffect(() => {
    axios.get(`https://api.dev.ceresa.com/api/v1/calendars/mentor-availability/${token}`,{ headers: { 'api-key': 'team@ceresa'}})
      .then(response => {
        //console.log('RESPONSE: ',JSON.stringify(response));
        setElementToken(response?.data?.data?.elementToken);
        setAvailabilityRuleId(response?.data?.data?.availabilityRuleId);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });

      //setElementToken(process.env.REACT_APP_ELEMENT_TOKEN);
      //setAvailabilityRuleId(process.env.REACT_APP_AVAILABILITY_RULE_ID);
      //setLoading(false);
  }, [token]);

  useEffect(() => {
    axios.get(`https://api.dev.ceresa.com/api/v1/calendars/mentor-agenda/${token}`,{ headers: { 'api-key': 'team@ceresa'}})
      .then(response => {
        //console.log('RESPONSE: ',JSON.stringify(response));
        setElementToken2(response?.data?.data?.elementToken);
        //setLoading(false);
      })
      .catch(error => {
        //setError(error);
        //setLoading(false);
      });

      //setElementToken2(process.env.REACT_APP_ELEMENT_TOKEN);
      //setLoading(false);
  }, [token]);

  const availabilityOptions = {
    element_token: elementToken,
    target_id: "cronofy-availability-rules",
    availability_rule_id: availabilityRuleId,
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
    callback: (notification) => {
      if(notification.notification.type === "availability_rule_saved"){
        //console.log('send email to the mentor: ',notification?.availability_rule?.calendar_ids[0]);
        axios.post(`https://api.dev.ceresa.com/api/v1/calendars/availability-confirmation/${token}`,null,{ headers: { 'api-key': 'team@ceresa'}})
      }
    },
    translations: {
      en: {
          availability_rules: {
              save_new_rules: "Save"
          }
      }
  }
  };

  const agendaOptions = {
    element_token: elementToken2,
    target_id: "cronofy-agenda"
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
        <p>Agenda</p>
        <AgendaWrapper options={agendaOptions} />
        </div>
        <div className="calendar-section right-section">
          <AvailabilityRulesWrapper options={availabilityOptions} />
        </div>
    </div>
  );
};

export default MentorAvailability;