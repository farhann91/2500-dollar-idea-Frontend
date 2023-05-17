import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { login } from "../../functions/authentication";
import { showAlert } from "../../functions/alert";

const Login = ({
  user,
  setUser,
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
    password: "",
  });

  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle submit
  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await login(email, password);
    if (data.name && data.name) {
      setIsAuthenticated(true);
      setUser({
        name: data.name,
        email: data.email,
      });
      // redirect
      history.push("/tasks");
    } else {
      const newalert = showAlert(data.error_message, "danger");
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
          <label>Email address</label>
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
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <p></p>
        <span className="submit-forgot-password">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/ResetPassword">Forgot password</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
