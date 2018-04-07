let router = require('express').Router();
let Notes = require('../models/notes')

router.get("/notes_entry",(req,res)=>{
		res.render("notes/notes_entry")
})

router.post("/notes_entry",(req,res)=>{
	let notes = new Notes()
	notes.title = req.body.title;
	notes.subject = req.body.subject;
	notes.semester = req.body.semester;
	notes.year = req.body.year;
	notes.user_id = req.user._id;
	notes.hashtags = req.body.hashtags;
	notes.link = req.body.link;
	notes.save((err)=>{
		console.log(err);
		res.redirect("/notes");

	})
})

module.exports = router