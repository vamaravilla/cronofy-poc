//import './App.css';
import AvailabilityViewerWrapper from "./components/AvailabilityViewerWrapper";

function App() {
  const availabilityOptions = {
    // Your options for the Availability Viewer
    element_token: process.env.REACT_APP_ELEMENT_TOKEN,
    target_id: "cronofy-availability-viewer",
    availability_query: {
        participants: [
            {
                required: "all",
                members: []
            }
        ],
        required_duration: { minutes: 60 },
        query_periods: [
            { start: "2024-07-31T09:00:00Z", end: "2024-07-31T17:00:00Z" },
            { start: "2024-08-01T09:00:00Z", end: "2024-08-01T17:00:00Z" },
            { start: "2024-08-02T09:00:00Z", end: "2024-08-02T17:00:00Z" },
            { start: "2024-08-03T09:00:00Z", end: "2024-08-03T17:00:00Z" }
        ],
    },
    config: {
        start_time: "09:00",
        end_time: "15:30",
        interval: 15
    },
    styles: {
        prefix: "custom-name"
    },
    callback: notification => console.log("callback", notification),
  };

  return (
      <div>
          {/* Other application code */}
          <AvailabilityViewerWrapper options={availabilityOptions} />
      </div>
  );
}

export default App;
