import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Moderator.module.css";

const Moderator = () => {
  const [data, setData] = useState([]);
  const [currentTable, setCurrentTable] = useState("announcements");
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchData = async (table) => {
    try {
      const response = await axios.get(`arega/api.php?table=${table}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`arega/api.php?table=${currentTable}&id=${id}`);
      fetchData(currentTable);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (item) => {
    setIsEditing(item.id);
    setEditData(item);
  };

  const handleSave = async () => {
    try {
      await axios.put(`arega/api.php?table=${currentTable}&id=${isEditing}`, editData);
      setIsEditing(null);
      fetchData(currentTable);
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  useEffect(() => {
    fetchData(currentTable);
  }, [currentTable]);

  return (
    <div className={styles.moderator}>
      <h2>Moderator Panel</h2>
      <div className={styles.tableSelector}>
        <button onClick={() => setCurrentTable("announcements")}>Announcements</button>
        <button onClick={() => setCurrentTable("projects")}>Projects</button>
        <button onClick={() => setCurrentTable("tasks")}>Tasks</button>
        <button onClick={() => setCurrentTable("users")}>Users</button>
        <button onClick={() => setCurrentTable("vacancies")}>Vacancies</button>
      </div>
      <table className={styles.moderatorTable}>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {Object.keys(item).map((key) => (
                <td key={key}>
                  {isEditing === item.id && key !== "id" ? (
                    <input
                      type="text"
                      value={editData[key]}
                      onChange={(e) =>
                        setEditData({ ...editData, [key]: e.target.value })
                      }
                    />
                  ) : (
                    item[key]
                  )}
                </td>
              ))}
              <td>
                {isEditing === item.id ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Moderator;
