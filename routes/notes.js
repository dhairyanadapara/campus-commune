let router = require('express').Router();


router.get("/notes",(req,res)=>{
	if(!req.user){
		res.redirect("/login")
	}
	
});