//import './App.css';
import AvailabilityRulesWrapper from "./components/AvailabilityRulesWrapper";

function App() {
  const availabilityOptions = {
    // Your options for the Availability Viewer
    element_token: process.env.REACT_APP_ELEMENT_TOKEN,
    target_id: "cronofy-availability-rules",
    availability_rule_id: "work_hours",
    config: {
      start_time: "08:00",
      end_time: "18:00",
      duration: 60
    },
    styles: {
        colors: {
            available: "green",
            unavailable: "red"
        },
        prefix: "custom-name"
    },
    tzid: "Etc/UTC"
  };

  return (
      <div>
          {/* Other application code */}
          <AvailabilityRulesWrapper options={availabilityOptions} />
      </div>
  );
}

export default App;
