//import AvailabilityViewerWrapper from "./components/AvailabilityViewerWrapper";
import AvailabilityRulesWrapper from "./components/AvailabilityRulesWrapper";

function App() {
  /*const availabilityOptions = {
    // Your options for the Availability Viewer
    element_token: process.env.REACT_APP_ELEMENT_TOKEN,
    target_id: "cronofy-availability-viewer",
    availability_query: {
        participants: [
            {
                required: "all",
                members: [
                  { sub: "pro_ZqlnazHyMg3N6Glw" },
              ]
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
  };*/

  const availabilityOptionsRules = {
    element_token: process.env.REACT_APP_ELEMENT_TOKEN,
    target_id: "cronofy-availability-rules",
    availability_rule_id: "work_hours",
    demo: true,
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
          <AvailabilityRulesWrapper options={availabilityOptionsRules} />
      </div>
  );
}

export default App;
