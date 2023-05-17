import React from "react";
// import { removeAlert } from "../../functions/alert";

const Alert = ({ alerts, setAlerts }) => {
  // Removing
  const removeAlert = (id) => {
    // Filter the clicked alert
    const newAlerts = alerts.filter((alert) => alert.id !== id);
    // Set the remaining alerts to the alerts
    setAlerts(newAlerts);
    // console.log("Remaining alerts: ", newAlerts);
  };
  return (
    <div className="alerts-container">
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => (
          <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
            <span
              className="removeAlertX"
              onClick={() => {
                removeAlert(alert.id);
              }}
            >
              x
            </span>
          </div>
        ))}
    </div>
  );
};

export default Alert;
