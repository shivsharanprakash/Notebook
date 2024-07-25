const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');



//Route 1:Get all the notes using GET "/api/notes/fetchallnotes" Login required.
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("some Error occured");
    }

});

//Route 2:Add note using POST "/api/notes/addnotes" Login required.
router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title ').isLength({ min: 3 }),
    body('description', 'description  must be at least 5 charecter').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //If there are errors ,return bad request and the errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id

        })
        const savedNote = await note.save()
        res.json(savedNote)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("some Error occured");

    }
});

//ROUTE 3:update an existing Note using :PUT "/api/notes/updatenote":Login Required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //create a newNote Object.
    try {
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find the note to be updated  and update it .

        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };

        //Ensure the authenticated user is the owner of the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occurred");
    }
});

//ROUTE 4:Delete an existing Note using :DELETE "/api/notes/deletenote":Login Required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    //create a newNote Object.
    try {
      //find the note to be deleted and delete it .
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };
        
        //allow deletion if user owns this note 
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occurred");
    }
});


module.exports = router