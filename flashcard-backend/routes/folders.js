const express = require("express");
const router = express.Router();
const Folder = require("../models/Folder");

// Get all folders
router.get("/", async (req, res) => {
  try {
    const folders = await Folder.find();
    res.json(folders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a folder by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const folder = await Folder.findById(Number(id));
    if (!folder) return res.status(404).json({ error: "Folder not found" });
    res.json(folder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new folder
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    const folders = await Folder.find({}, "_id").sort({ _id: 1 });
    const usedIds = folders.map((folder) => folder._id);

    let newId = 1;
    for (let i = 0; i < usedIds.length; i++) {
      if (newId === usedIds[i]) newId++;
      else break;
    }

    const folder = new Folder({
      _id: newId,
      name,
      description,
      cardCount: 0,
      cards: [],
    });
    await folder.save();
    res.status(201).json(folder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a folder
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Folder.findByIdAndDelete(Number(id));
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a flashcard to a folder
router.post("/:id/cards", async (req, res) => {
  try {
    const { id } = req.params;
    const { topic, explanation } = req.body;

    const folder = await Folder.findById(Number(id));
    if (!folder) return res.status(404).json({ error: "Folder not found" });

    folder.cards.push({ topic, explanation });
    folder.cardCount = folder.cards.length;
    await folder.save();

    res.status(201).json(folder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a flashcard in a folder
router.put("/:folderId/cards/:cardIndex", async (req, res) => {
  try {
    const { folderId, cardIndex } = req.params;
    const { topic, explanation } = req.body;

    const folder = await Folder.findById(Number(folderId));
    if (!folder || !folder.cards[cardIndex])
      return res.status(404).json({ error: "Folder or card not found" });

    folder.cards[cardIndex] = { topic, explanation };
    await folder.save();

    res.json(folder.cards[cardIndex]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a flashcard from a folder
router.delete("/:folderId/cards/:cardIndex", async (req, res) => {
  try {
    const { folderId, cardIndex } = req.params;

    const folder = await Folder.findById(Number(folderId));
    if (!folder) return res.status(404).json({ error: "Folder not found" });

    folder.cards.splice(Number(cardIndex), 1);
    folder.cardCount = folder.cards.length;
    await folder.save();

    res.status(200).json(folder.cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
