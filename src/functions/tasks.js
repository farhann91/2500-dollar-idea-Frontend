import axios from "axios";

// Create task
export const addTask = async (text) => {
  const newTask = { text };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(newTask);
  try {
    // const res = await axios.post("http://localhost:9999/tasks", body, config);
    const res = await axios.post(
      "https://nice-blue-sheep-toga.cyclic.app/tasks",
      body,
      config
    );
    return res.data;

    // Load user
  } catch (error) {
    console.log(error.response.data);
  }
};

// Update task
export const updatetask = async (id, text) => {
  const newTask = { text };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(newTask);

  try {
    const res = await axios.put(
      // `http://localhost:9999/tasks/${id}`,
      `https://nice-blue-sheep-toga.cyclic.app/tasks/${id}`,
      body,
      config
    );
    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

// Fetch tasks for the logged in user
export const fetchTasks = async () => {
  try {
    // const res = await axios.get("http://localhost:9999/tasks");
    const res = await axios.get(
      "https://nice-blue-sheep-toga.cyclic.app/tasks"
    );
    return res.data;

    // Load user
  } catch (error) {
    console.log(error.response.data);
  }
};
