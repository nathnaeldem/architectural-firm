import React, { useState } from "react";

const TaskChecker = () => {
  const [tasks, setTasks] = useState([
    { id: 1, description: "Prepare the monthly report", completed: false },
    { id: 2, description: "Update the client database", completed: false },
    { id: 3, description: "Organize team meeting", completed: false },
  ]);

  const markTaskAsCompleted = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Tasks from Manager</h2>
      {tasks.length === 0 ? (
        <p>No tasks assigned.</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: task.completed ? "#d4edda" : "#f8d7da",
              }}
            >
              <p
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.description}
              </p>
              {!task.completed && (
                <button
                  onClick={() => markTaskAsCompleted(task.id)}
                  style={{
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Mark as Completed
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskChecker;
