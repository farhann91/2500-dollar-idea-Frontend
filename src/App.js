import { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Register from "./components/forms/Register";
import Login from "./components/forms/Login";
import { useState } from "react";
import Landing from "./components/layout/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import Tasks from "./components/dashboard/Tasks";
import PrivateRoute from "./components/routing/PrivateRoute";
import axios from "axios";
import Alert from "./components/layout/Alert";
import image from "./img/User-avatar.png";
import ResetPassword from "./components/forms/ResetPassword";
import moment from "moment";

function App() {
  let now = moment().format("LLLL");
  //  User state
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);

  // Loading user
  const downloadingUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
      const res = await axios.get("http://localhost:9999/users/authenticate");

      // Changing the state
      setUser(res.data.user);
      setIsAuthenticated(true);
      setLoading(false);
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
    }
  };

  useEffect(() => {
    downloadingUser();
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Navbar
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            setUser={setUser}
            loading={loading}
          />

          <Alert alerts={alerts} setAlerts={setAlerts} />
          {isAuthenticated && !loading ? (
            <div className="container dashHeader">
              <span className="name-avatar">
                <img alt="avatar" src={image} /> {user && user.name}
              </span>
              <span>{now}</span>
            </div>
          ) : null}
          <div className="content">
            <section className="display-area">
              <Switch>
                <Route exact path="/">
                  <Landing
                    user={user}
                    loading={loading}
                    isAuthenticated={isAuthenticated}
                  />
                </Route>
                <Route exact path="/register">
                  <Register
                    user={user}
                    setUser={setUser}
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                    alerts={alerts}
                    setAlerts={setAlerts}
                    loading={loading}
                    setLoading={setLoading}
                  />
                </Route>
                <Route exact path="/login">
                  <Login
                    user={user}
                    setUser={setUser}
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                    loading={loading}
                    alerts={alerts}
                    setAlerts={setAlerts}
                  />
                </Route>
                <Route exact path="/ResetPassword">
                  <ResetPassword
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                    loading={loading}
                    alerts={alerts}
                    setAlerts={setAlerts}
                  />
                </Route>
                <PrivateRoute exact path="/dashboard">
                  <Dashboard
                    loading={loading}
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                    user={user}
                    setUser={setUser}
                    alerts={alerts}
                    setAlerts={setAlerts}
                  />
                </PrivateRoute>
                <PrivateRoute exact path="/tasks">
                  <Tasks
                    user={user}
                    loading={loading}
                    setLoading={setLoading}
                    isAuthenticated={isAuthenticated}
                    tasks={tasks}
                    setTasks={setTasks}
                    alerts={alerts}
                    setAlerts={setAlerts}
                  />
                </PrivateRoute>
              </Switch>
            </section>
          </div>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
