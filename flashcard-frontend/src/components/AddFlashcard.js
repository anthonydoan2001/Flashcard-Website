import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../api";
import styles from "./AddFlashcard.module.css";

const AddFlashcard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [folderName, setFolderName] = useState("");
  const [topic, setTopic] = useState("");
  const [explanation, setExplanation] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/folders/${id}`)
      .then((response) => setFolderName(response.data.name))
      .catch(() => alert("Error fetching folder name"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_BASE_URL}/folders/${id}/cards`, {
        topic,
        explanation,
      });
      navigate(`/folder/${id}`);
    } catch (err) {
      alert("Error adding flashcard");
    }
  };

  return (
    <div className={styles.addFlashcard}>
      <h1>Add a Flashcard to {folderName}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Topic:
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </label>
        <label>
          Explanation:
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Flashcard</button>
      </form>
    </div>
  );
};

export default AddFlashcard;
