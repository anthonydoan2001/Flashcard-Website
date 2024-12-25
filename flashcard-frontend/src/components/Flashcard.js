import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Flashcard.module.css";
import * as XLSX from "xlsx";

const FolderHome = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [importing, setImporting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editingCardIndex, setEditingCardIndex] = useState(null);
  const [editedTopic, setEditedTopic] = useState("");
  const [editedExplanation, setEditedExplanation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const folderResponse = await axios.get(
          `http://localhost:5000/api/folders/${id}`
        );
        setFolderName(folderResponse.data.name);
        setFolderDescription(folderResponse.data.description);
        setEditedName(folderResponse.data.name);
        setEditedDescription(folderResponse.data.description);

        const cardsResponse = folderResponse.data.cards || [];
        setCards(cardsResponse);
      } catch (err) {
        setError("Folder not found or an error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleDelete = async (cardIndex) => {
    try {
      const cardId = cards[cardIndex]._id;
      await axios.delete(
        `http://localhost:5000/api/folders/${id}/cards/${cardId}`
      );
      setCards(cards.filter((_, index) => index !== cardIndex));
    } catch (err) {
      alert("Failed to delete flashcard");
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    setImporting(true);

    try {
      const data = await readExcelFile(file);

      for (const card of data) {
        await axios.post(`http://localhost:5000/api/folders/${id}/cards`, {
          topic: card.Topic,
          explanation: card.Explanation,
        });
      }

      const folderResponse = await axios.get(
        `http://localhost:5000/api/folders/${id}`
      );
      setCards(folderResponse.data.cards || []);
      alert("Cards imported successfully!");
    } catch (err) {
      alert("Error importing cards: " + err.message);
    } finally {
      setImporting(false);
      event.target.value = "";
    }
  };

  const readExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const workbook = XLSX.read(e.target.result, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const data = XLSX.utils.sheet_to_json(worksheet);

          if (!data.length || !data[0].Topic || !data[0].Explanation) {
            throw new Error(
              'Invalid Excel format. Please ensure "Topic" and "Explanation" headers exist.'
            );
          }
          resolve(data);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsArrayBuffer(file);
    });
  };

  const handleEdit = async () => {
    if (isEditing) {
      try {
        await axios.put(`http://localhost:5000/api/folders/${id}`, {
          name: editedName,
          description: editedDescription,
        });
        setFolderName(editedName);
        setFolderDescription(editedDescription);
      } catch (err) {
        alert("Failed to update folder");
      }
    }
    setIsEditing(!isEditing);
  };

  const handleCardEdit = async (index) => {
    if (editingCardIndex === index) {
      try {
        const cardId = cards[index]._id;
        await axios.put(
          `http://localhost:5000/api/folders/${id}/cards/${cardId}`,
          { topic: editedTopic, explanation: editedExplanation }
        );

        const updatedCards = [...cards];
        updatedCards[index] = {
          _id: cardId,
          topic: editedTopic,
          explanation: editedExplanation,
        };
        setCards(updatedCards);
        setEditingCardIndex(null);
      } catch (err) {
        alert("Failed to update flashcard");
      }
    } else {
      setEditingCardIndex(index);
      setEditedTopic(cards[index].topic);
      setEditedExplanation(cards[index].explanation);
    }
  };

  const handleCreateTest = () => navigate(`/folder/${id}/create-test`);

  if (loading) return <div className={styles.folderHome}>Loading...</div>;
  if (error) return <div className={styles.folderHome}>{error}</div>;

  return (
    <div className={styles.folderHome}>
      {/* Header */}
      <div className={styles.header}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className={styles.editInput}
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className={styles.editTextarea}
            />
          </>
        ) : (
          <>
            <h1>{folderName}</h1>
            <p>{folderDescription}</p>
          </>
        )}
        <button onClick={handleEdit} className={styles.editButton}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      {/* Flashcards */}
      <div className={styles.cardList}>
        {cards.map((card, index) => (
          <div key={index} className={styles.card}>
            <h2>{card.topic}</h2>
            <p>{card.explanation}</p>
            <button
              onClick={() => handleDelete(index)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderHome;
