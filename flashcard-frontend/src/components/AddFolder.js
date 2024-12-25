import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../api";
import styles from "./AddFolder.module.css";

const AddFolder = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${API_BASE_URL}/folders`, { name, description })
      .then(() => {
        setName("");
        setDescription("");
        navigate("/");
      })
      .catch((err) => console.error("Error adding folder:", err));
  };

  return (
    <div className={styles.addFolder}>
      <h1>Add a New Folder</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Folder Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Folder</button>
      </form>
    </div>
  );
};

export default AddFolder;
