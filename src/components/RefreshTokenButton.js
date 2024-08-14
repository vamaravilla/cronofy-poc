import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';
import { Button } from '@mui/material';

const RefreshTokenButton = () => {
  const { setGlobalData } = useContext(GlobalContext);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const data = await response.json();
      setGlobalData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return <Button variant="contained"  onClick={fetchData}>Refresh Token</Button>
};

export default RefreshTokenButton;