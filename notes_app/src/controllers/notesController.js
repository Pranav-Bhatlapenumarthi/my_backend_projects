const { model, get } = require("mongoose");
const Note = require("../models/noteModel");

const createNote = async (req, res, next) =>{
    try{
        const {title, content} = req.body;
        if(!title){
            return res.status(400).json({message: "Title required but not found"});
        }

        const note = new Note({title: title, content: content, owner: req.body._id });
        await note.save();

        return note.status(200).json(note);
    } catch(err){
        next(err);
    }
};

const listNotes = async (req, res, next) =>{
    try{
        const notes = await Note.find({owner: req.user._id}).sort({updatedAt: -1}); // orders the results by the timestamp in descending order (newest note first)
        return res.json(notes);
    } catch(err){
        next(err);
    }
};

const getNote = async (req, res, next) => {
    try{
        const note = await Note.findOne({ _id: req.params.id, owner: req.user._id}); // req.params gives the named route parameters
        if (!note){
            return res.status(404).json({message: "Note not found"});
        }
        return res.status(200).json(note);
    } catch(err){
        next(err);
    }
};

const deleteNote = async (req, res, next) => {
    try{
        const note = await Note.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        if(!note){
            return res.status(404).json({message: "Note not found"});
        }

        return res.status(200).json({message: "Note deleted successfully"});
    } catch(err){
        next(err);
    }
};

const updateNote = async (req, res, next) =>{
    try{
        const update = req.body;
        const note = await Note.findOneAndUpdate({_id: req.params.id, owner: req.user._id, }, update, {new: true});
        if(!note){
            return res.status(404).json({message: "Note not found"});
        }

        return res.status(200).json(note);
    } catch(err){
        next(err);
    }
};

module.exports = {createNote, getNote, deleteNote, updateNote, listNotes};