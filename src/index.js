import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MentorAvailability from './MentorAvailability';
import MentorViewer from './MentorViewer';
import MentorScheduler from './MentorScheduler';
import { GlobalProvider } from './GlobalContext';

/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);*/

/*ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/availability/:token" element={<MentorAvailability />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);*/


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/availability/:token" element={<MentorAvailability />} />
          <Route path="/scheduler/:token" element={<MentorScheduler />} />
          <Route path="/viewer/:token" element={<MentorViewer />} />
        </Routes>
      </Router>
    </GlobalProvider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
