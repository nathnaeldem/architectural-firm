import React, { useState } from "react";

const AdminTaskUploader = () => {
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleUpload = async () => {
    if (!description) {
      setStatusMessage("Task description is required.");
      return;
    }

    const taskData = {
      description: description,
      assigned_to: assignedTo,
    };
    console.log(taskData);

    try {
      const response = await fetch("arega/task.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const contentType = response.headers.get("content-type");
      let result;

      if (response.ok) {
        if (contentType && contentType.includes("application/json")) {
          result = await response.json();
          if (result.status === "success") {
            setStatusMessage("Task uploaded successfully.");
            setDescription("");
            setAssignedTo("");
          } else {
            setStatusMessage(result.message);
          }
        } else {
          throw new Error("Non-JSON response received.");
        }
      } else {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setStatusMessage("Error uploading task.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Admin - Upload Task</h2>
      <div style={{ marginBottom: "10px" }}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        ></textarea>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          placeholder="Staff name or ID"
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          placeholder="date"
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <button
        onClick={handleUpload}
        style={{
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Upload Task
      </button>
      {statusMessage && (
        <p style={{ marginTop: "10px", color: "green" }}>{statusMessage}</p>
      )}
    </div>
  );
};

export default AdminTaskUploader;
