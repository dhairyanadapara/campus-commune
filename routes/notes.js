let router = require('express').Router();
let Notes = require("../models/notes") 
router.get("/notes",(req,res)=>{
	if(!req.user){
		console.log("here");
		res.redirect("/login")
	}
	Notes.where('user_id').ne(req.user._id).then((note)=>{
		console.log(note);
		console.log(req.user._id)
		res.render("notes/all_notes",{resource:note})
		
	})
	.catch(err=>{
		return err;
	})
});

module.exports = router;

