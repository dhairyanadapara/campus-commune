let router = require('express').Router();
let Notes = require('../models/notes')


router.get("/mynotes",(req,res)=>{
	Notes.where('user_id').eq(req.user._id).then((note)=>{
		console.log(note);
		res.render("notes/mynotes",{resource:note})
		
	})
})

module.exports = router