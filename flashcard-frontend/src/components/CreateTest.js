import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../api";
import styles from "./CreateTest.module.css";

const CreateTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/folders/${id}/cards`);
        const shuffledCards = shuffleArray(response.data);
        setCards(shuffledCards);

        const generatedAnswers = shuffledCards.map((card) => {
          const otherCards = response.data.filter(
            (c) => c.topic !== card.topic
          );
          const wrongAnswers = getRandomElements(otherCards, 3).map(
            (c) => c.topic
          );
          return shuffleArray([card.topic, ...wrongAnswers]);
        });
        setAnswers(generatedAnswers);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    fetchCards();
  }, [id]);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const getRandomElements = (array, count) => {
    return shuffleArray(array).slice(0, count);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    const correct = answer === cards[currentQuestionIndex].topic;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    if (currentQuestionIndex < cards.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setIsComplete(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsComplete(false);
    setScore(0);
    setIsCorrect(null);
    setCards(shuffleArray(cards));
    setAnswers(shuffleArray(answers));
  };

  const handleBack = () => {
    navigate(`/folder/${id}`);
  };

  if (cards.length === 0) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (isComplete) {
    return (
      <div className={styles.container}>
        <div className={styles.resultCard}>
          <h2>Test Complete!</h2>
          <p className={styles.score}>
            Your score: {score} out of {cards.length}
            <br />({Math.round((score / cards.length) * 100)}%)
          </p>
          <div className={styles.buttonGroup}>
            <button onClick={handleRetry} className={styles.retryButton}>
              Try Again
            </button>
            <button onClick={handleBack} className={styles.backButton}>
              Back to Folder
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.questionCard}>
        <div className={styles.progress}>
          Question {currentQuestionIndex + 1} of {cards.length}
        </div>
        <h2 className={styles.question}>
          {cards[currentQuestionIndex].explanation}
        </h2>
        <div className={styles.answers}>
          {answers[currentQuestionIndex].map((answer, index) => (
            <button
              key={index}
              className={`${styles.answerButton} ${
                selectedAnswer === answer
                  ? isCorrect
                    ? styles.correct
                    : styles.wrong
                  : ""
              }`}
              onClick={() => handleAnswerSelect(answer)}
              disabled={selectedAnswer !== null}
            >
              {String.fromCharCode(65 + index)}. {answer}
            </button>
          ))}
        </div>
        <button
          className={styles.nextButton}
          onClick={handleNext}
          disabled={selectedAnswer === null}
        >
          {currentQuestionIndex === cards.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default CreateTest;
