import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../api";
import styles from "./Home.module.css";

const Home = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFolders, setSelectedFolders] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/folders`);
        setFolders(response.data);
      } catch (err) {
        setError("Failed to load folders");
      }
    };
    fetchFolders();
  }, []);

  const handleFolderClick = (folder) => {
    if (!isSelecting) {
      navigate(`/folder/${folder._id}`);
    } else {
      handleSelect(folder._id);
    }
  };

  const toggleSelectMode = () => {
    setIsSelecting(!isSelecting);
    setSelectedFolders([]);
  };

  const handleSelect = (id) => {
    if (isSelecting) {
      setSelectedFolders((prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((folderId) => folderId !== id)
          : [...prevSelected, id]
      );
    }
  };

  const handleDelete = async () => {
    try {
      await Promise.all(
        selectedFolders.map((id) =>
          axios.delete(`${API_BASE_URL}/folders/${id}`)
        )
      );
      setFolders(
        folders.filter((folder) => !selectedFolders.includes(folder._id))
      );
      setSelectedFolders([]);
      setIsSelecting(false);
    } catch (err) {
      alert("Failed to delete folders");
    }
  };

  if (error) return <div className={styles.home}>Error: {error}</div>;

  return (
    <div className={styles.home}>
      <div className={styles.folderGrid}>
        {folders.map((folder) => (
          <div
            key={folder._id}
            className={`${styles.folder} ${
              selectedFolders.includes(folder._id) ? styles.selected : ""
            }`}
            onClick={() => handleFolderClick(folder)}
          >
            <h2>{folder.name}</h2>
            <p>{folder.description}</p>
            <p>{folder.cardCount} flashcards</p>
          </div>
        ))}
      </div>
      <Link to="/add-folder" className={styles.btn}>
        Add Folder
      </Link>
      <button onClick={toggleSelectMode} className={styles.deleteBtn}>
        {isSelecting ? "Cancel" : "Delete"}
      </button>
      {isSelecting && (
        <button onClick={handleDelete} className={styles.confirmDeleteBtn}>
          Confirm Delete
        </button>
      )}
    </div>
  );
};

export default Home;
