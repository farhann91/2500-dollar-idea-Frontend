import React from "react";
import { useHistory } from "react-router-dom";
import { removeAccount } from "../../functions/authentication";
import { showAlert } from "../../functions/alert";

const Dashboard = ({
  user,
  setUser,
  setIsAuthenticated,
  setAlerts,
  alerts,
}) => {
  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();
    const success = removeAccount();
    if (success) {
      const newalert = showAlert("Bye user, sad to see you leave", "success");
      setAlerts([...alerts, newalert]);
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
      // Redirecct after 5 seconds
      setTimeout(() => {
        removeAlert(newalert.id);
        history.push("/");
      }, 5000);
    }
  };

  // Removing
  const removeAlert = (id) => {
    // Filter the clicked alert
    const newAlerts = alerts.filter((alert) => alert.id !== id);
    // Set the remaining alerts to the alerts
    setAlerts(newAlerts);
  };
  return (
    <div className="container">
      {/* About */}
      <div className="card">
        <div className="card-header">
          <h4>Perfomance</h4>
        </div>
        <div className="card-body">
          <h6>Monthily Perfomance</h6>
          <div className="badge primary">60% successfull</div>
          <p>18 days successfull out of 31 days</p>
          <p>This entails the idea of living your life one dy at a time.</p>
          <p>
            It states that a successfull life is one which comproses of
            successfull months, weeks and days. A successfull day is one that
            its activities have contributed possitively to the attainment of a
            goal.
          </p>
        </div>
      </div>
      <p></p>
      <form onSubmit={(e) => onSubmit(e)}>
        <button type="submit" className="btn btn-danger form-control">
          Delete account
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
