const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {createNote, getNote, deleteNote, updateNote, listNotes} = require("../controllers/notesController");

router.use(auth);

router.post("/", createNote);
router.get("/", listNotes);
router.get("/:id", getNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;