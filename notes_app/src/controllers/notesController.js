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
        const notes = await Note.find({owner: req.user._id}).sort({updatedAt: -1});
    } catch(err){
        next(err);
    }
};