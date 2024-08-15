const express = require("express");
const router = express.Router();
const noteModel = require("../models/noteModel");

// route to get data
router.get("/api/notes", async(req, res) => {
  try {
    const notes =await noteModel.find(req.body);
    res.status(200).json(notes)
  } catch (error) {
     res.status(500).json('server error while fetching data')
  }
});

// route to post data
router.post("/api/notes", async(req, res) => {
    const newNote = new noteModel({
      note:req.body.note,
      title:req.body.title
    })
  try {
    const savedNote =await newNote.save()
    res.status(200).json({message:'note saved successfuly',data:savedNote})
  } catch (error) {
     res.status(500).json('server error while posting note')
  }

});

// route to update data
router.patch("/api/notes/:id", async(req, res) => {
    const id= req.params.id
    try {
      const updatedNote= await noteModel.findByIdAndUpdate(id,req.body,{new:true})
      if(!updatedNote){
        res.status(404).json('note not found')
      }
      res.status(200).json({message:"note updated successfuly",data:updatedNote})
    } catch (error) {
        res.status(500).json('server error while updating note')
    }
});

// route to delete data
router.delete("/api/notes/:id", async(req, res) => {
    const id= req.params.id
    try {
       const deletedNote= await noteModel.findByIdAndDelete(id)
       if(!deletedNote){
         res.status(404).json('note not found')
       }
       res.status(200).json({message:'note deleted successfuly',data:deletedNote})
    } catch (error) {
        res.status(500).json('server error while deleting note')
    }
});

module.exports = router;
