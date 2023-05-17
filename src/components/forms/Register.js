import React, { useState } from "react";
import { register } from "../../functions/authentication";
import { Redirect, useHistory } from "react-router-dom";
import { showAlert } from "../../functions/alert";

const Register = ({
  user,
  setUser,
  isAuthenticated,
  setIsAuthenticated,
  alerts,
  setAlerts,
  setLoading,
  loading,
}) => {
  const history = useHistory();
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  // OnChange
  const onChange = (e) =>
    setFormData({ ...formdata, [e.target.name]: e.target.value });

  const { name, email, password, password2 } = formdata;

  // OnSubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      const newalert = showAlert("Passwords do not much", "danger");
      setAlerts([...alerts, newalert]);

      // Remove the alert after 5 seconds
      setTimeout(() => {
        removeAlert(newalert.id);
      }, 5000);

      return;
    }
    const data = await register(name, email, password);
    if (data.user) {
      const newalert = showAlert("User registered succesfully", "success");
      setAlerts([...alerts, newalert]);

      // Remove the alert after 5 seconds
      setTimeout(() => {
        removeAlert(newalert.id);
      }, 5000);

      //Changing the state
      setIsAuthenticated(true);
      setUser({
        name: data.user.name,
        email: data.user.email,
      });
      setTimeout(() => {
        history.push("/tasks");
      }, 6000);
    } else {
      const newalert = showAlert(data.msg, "danger");
      setAlerts([...alerts, newalert]);

      // Remove the alert after 5 seconds
      setTimeout(() => {
        removeAlert(newalert.id);
      }, 5000);
    }
  };

  // Redirect user if logged in
  if (isAuthenticated) {
    return <Redirect to="/tasks" />;
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
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <label htmlFor="exampleInputname">Full name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter fullname"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
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
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password again"
            name="password2"
            value={password2}
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

export default Register;
