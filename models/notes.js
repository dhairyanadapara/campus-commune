let mongoose = require('mongoose')

let notesSchema = new mongoose.Schema({
	title:{type:String,required:true},
	subject:{type:String,required:true},
	semester:{type:Number, required:true},
	year:{type:String,required:true},
	user_id:{type:String,required:true},
	ratings:[{type:Number}],
	hashtags:[{type:String}],
	link:{type:String,required:true,default:''}
})

module.exports = mongoose.model("Notes",notesSchema,'notes')