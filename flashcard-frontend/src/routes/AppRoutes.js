import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Flashcard from "../components/Flashcard";
import AddFlashcard from "../components/AddFlashcard";
import AddFolder from "../components/AddFolder";
import CreateTest from "../components/CreateTest";
import Navbar from "../components/Navbar";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/folder/:id" element={<Flashcard />} />
        <Route path="/folder/:id/add-flashcard" element={<AddFlashcard />} />
        <Route path="/add-folder" element={<AddFolder />} />
        <Route path="/folder/:id/create-test" element={<CreateTest />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
