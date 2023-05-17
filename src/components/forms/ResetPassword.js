import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { resetPassword } from "../../functions/authentication";
import { showAlert } from "../../functions/alert";

const ResetPassword = ({
  isAuthenticated,
  setIsAuthenticated,
  loading,
  setLoading,
  alerts,
  setAlerts,
}) => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle submit
  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await resetPassword(email);
    if (data.newPassword) {
      // Show alert and remove it after 5 seconds
      const newalert = showAlert(
        `New password for ${data.user.email} is : 123456`,
        `success`
      );
      // console.log("New alerts: ", newalert);
      setAlerts([...alerts, newalert]);

      // Remove the alert after 5 seconds
      setTimeout(() => {
        removeAlert(newalert.id);
      }, 5000);

      // redirect after 7 seconds
      setTimeout(() => {
        history.push("/login");
      }, 6000);
    } else {
      const newalert = showAlert(data[0].msg, "danger");
      setAlerts([...alerts, newalert]);

      // Remove the alert after 5 seconds
      setTimeout(() => {
        removeAlert(newalert.id);
      }, 5000);
    }
  };

  // Redirect user if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  // Removing
  const removeAlert = (id) => {
    // Filter the clicked alert
    const newAlerts = alerts.filter((alert) => alert.id !== id);
    // Set the remaining alerts to the alerts
    setAlerts(newAlerts);
  };
  return (
    <div className="form-container">
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label>Registered email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <p></p>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
