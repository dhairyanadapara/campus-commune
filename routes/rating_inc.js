let router = require('express').Router();
let Notes = require('../models/notes')


router.post("/rating_inc/:id",(req,res)=>{
	let prating = req.rating;
	let pid = req.params.id;
	Notes.find({_id:pid}).then((note)=>{
		note.rating.push(prating);
		note.save().then(()=>{res.redirect("/notes")}).catch((err)=>{return err});
	})
})