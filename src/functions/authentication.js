import axios from "axios";
import setAuthToken from "./setAuthToken";

export const register = async (name, email, password) => {
  const newUser = { name, email, password };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(newUser);
  try {
    const res = await axios.post(
      // "http://localhost:9999/users/register",
      "https://nice-blue-sheep-toga.cyclic.app/users/register",
      body,
      config
    );

    return res.data;
  } catch (error) {
    const errors = error.response.data;
    return errors;
  }
};

// Load user
export const loadUser = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    // const res = await axios.get("http://localhost:9999/users/authenticate");
    const res = await axios.get(
      "https://nice-blue-sheep-toga.cyclic.app/users/authenticate"
    );
    return res.data.user;
  } catch (error) {
    return error;
  }
};

// Function to login a user
export const login = async (email, password) => {
  const newUser = { email, password };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(newUser);
  try {
    const res = await axios.post(
      // "http://localhost:9999/users/login",
      "https://nice-blue-sheep-toga.cyclic.app/users/login",
      body,
      config
    );
    //   Set token in the localstorage
    localStorage.setItem("token", res.data.token);

    // Load user
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get(
        "https://nice-blue-sheep-toga.cyclic.app/users/authenticate"
      );
      return res.data.user;
    } catch (error) {
      return error;
    }
  } catch (error) {
    return error.response.data;
  }
};

// Function to Reset a user password
export const resetPassword = async (email) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });
  try {
    const res = await axios.post(
      "https://nice-blue-sheep-toga.cyclic.app/users/resetPassword",
      body,
      config
    );

    return res.data;
  } catch (error) {
    return error.response.data.errors;
  }
};

// Function to delete a user and his tasks
export const removeAccount = async () => {
  try {
    const res = await axios.delete(
      "https://nice-blue-sheep-toga.cyclic.app/users"
    );
    return res.data;
  } catch (error) {
    return error;
  }
};
