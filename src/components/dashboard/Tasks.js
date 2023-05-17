import React, { useState, useEffect } from "react";
import { addTask, fetchTasks, updatetask } from "../../functions/tasks";
import { showAlert } from "../../functions/alert";
import axios from "axios";

const Tasks = ({
  user,
  isAuthenticated,
  tasks,
  setTasks,
  loading,
  setLoading,
  alerts,
  setAlerts,
}) => {
  const [formData, setFormData] = useState({
    text: "",
    id: "",
  });

  // Toggling social inputs
  const [displayAddTaskForm, toggleAddTaskForm] = useState(false);
  const [displayEditTaskForm, toggleEditTaskForm] = useState(false);

  const { text, id } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle submit Add task
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await addTask(text);

    // Load the updated tasks array and change the state
    const updatedTasks = await fetchTasks();
    if (updatedTasks) {
      setLoading(false);
      setTasks(updatedTasks);
      setFormData({ ...formData, text: "" });
      const newalert = showAlert("Task added succesfully", "success");
      setAlerts([...alerts, newalert]);

      // Remove the alert after 5 seconds
      setTimeout(() => {
        removeAlert(newalert.id);
      }, 5000);
    }
  };

  //  Handle submit Edit Task
  const onSubmitEdit = async (e) => {
    e.preventDefault();
    const taskThatWasUpdated = await updatetask(id, text);
    setLoading(true);
    if (taskThatWasUpdated) {
      // Load the updated tasks array and change the state
      const updatedTasks = await fetchTasks();
      if (updatedTasks) {
        setLoading(false);
        setTasks(updatedTasks);
        setFormData({ ...formData, text: "" });
        const newalert = showAlert("Task updated succesfully", "success");
        setAlerts([...alerts, newalert]);

        // Remove the alert after 5 seconds
        setTimeout(() => {
          removeAlert(newalert.id);
        }, 5000);
      }
    }
  };

  // Loading tasks
  const downloadingTasks = async () => {
    // fetchTasks()
    // const res = await axios.get("http://localhost:9999/tasks");
    const res = await axios.get(
      "https://nice-blue-sheep-toga.cyclic.app/tasks"
    );
    // Changing the state
    setTasks(res.data);
  };

  // Delete task
  const deleteTask = async (taskId) => {
    // const res = await axios.delete(`http://localhost:9999/tasks/${taskId}`);
    const res = await axios.delete(
      `https://nice-blue-sheep-toga.cyclic.app/tasks/${taskId}`
    );

    if (res.data) {
      // Load the remaining tasks into the state
      const remainingTasks = await fetchTasks();
      setTasks(remainingTasks);

      const newalert = showAlert("Task deleted succesfully", "success");
      setAlerts([...alerts, newalert]);

      // Remove the alert after 5 seconds
      setTimeout(() => {
        removeAlert(newalert.id);
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

  useEffect(() => {
    setLoading(true);
    downloadingTasks();
    setLoading(false);
  }, []);
  return (
    <div className="task-container">
      {!displayAddTaskForm && (
        <button
          className="btn btn-warning form-control addTaskBtn"
          onClick={() => {
            toggleAddTaskForm(!displayAddTaskForm);
            toggleEditTaskForm(false);
            setFormData({ ...formData, text: "" });
          }}
        >
          Add Task
        </button>
      )}

      {/* Add task form */}
      {displayAddTaskForm && (
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <h5 className="text-center">Add Task</h5>
          <div className="form-group">
            <label>Tomorrow's task</label>
            <input
              type="text"
              className="form-control"
              name="text"
              value={text}
              placeholder="Add task"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div>
            <p></p>
          </div>
          <button type="submit" className="form-control btn btn-primary">
            Submit
          </button>
        </form>
      )}

      {/* Edit task form */}
      {displayEditTaskForm && (
        <form className="form" onSubmit={(e) => onSubmitEdit(e)}>
          <h5 className="text-center">Edit Task</h5>
          <div className="form-group">
            <label>Tomorrow's task</label>
            <input
              type="text"
              className="form-control"
              name="text"
              value={text}
              placeholder="Add task"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group" hidden>
            <label>Tomorrow's task</label>
            <input
              type="text"
              className="form-control"
              name="id"
              value={id}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div>
            <p></p>
          </div>
          <button type="submit" className="form-control btn btn-primary">
            Submit
          </button>
        </form>
      )}
      {loading ? (
        <>Loading</>
      ) : (
        <>
          {tasks.length > 0 ? (
            <table className="task-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Task</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id}>
                    <td>{task._id}</td>
                    <td>{task.text}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm edit-btn"
                        onClick={() => {
                          toggleEditTaskForm(true);
                          toggleAddTaskForm(false);
                          setFormData({
                            ...formData,
                            text: task.text,
                            id: task._id,
                          });
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteTask(task._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ marginTop: "30px" }}>No tasks yet</p>
          )}
        </>
      )}
    </div>
  );
};

export default Tasks;
