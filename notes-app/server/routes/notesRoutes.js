const express = require("express");
const router = express.Router();
const noteModel = require("../models/noteModel");

// route to get data
router.get("/", async(req, res) => {
  try {
    const notes =await noteModel.find(req.body);
    res.status(200).json(notes)
  } catch (error) {
     res.status(500).json('server error while fetching data')
  }
});

// route to post data
router.post("/", async(req, res) => {
    const newNote = new notesModel.add(req.body.note);
  try {
    const savedNote =await newNote.save()
    res.status(200).json(savedNote)
  } catch (error) {
     res.status(500).json('server error while posting note')
  }

});

// route to update data
router.patch("/:id", async(req, res) => {
    const id= req.params.id
    try {
      const updatedNote= await noteModel.findByIdAndUpdate(id,req.body.note,{new:true})
      if(!updatedNote){
        res.status(404).json('note not found')
      }
      res.status(200).json(updatedNote)
    } catch (error) {
        res.status(500).json('server error while updating note')
    }
});

// route to delete data
router.delete("/:id", async(req, res) => {
    const id= req.params.id
    try {
       const deletedNote= await noteModel.findByIdAndDelete(id)
       if(!deletedNote){
         res.status(404).json('note not found')
       }
       res.status(200).json(deletedNote)
    } catch (error) {
        res.status(500).json('server error while deleting note')
    }
});

module.exports = router;
