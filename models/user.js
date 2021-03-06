let mongoose = require(`mongoose`);
let bcrypt = require(`bcrypt-nodejs`);

let UserSchema =new mongoose.Schema({
    email:{type: String, unique:true, lowercase: true, required:true},
    password:String,
    profile:{
        name:{type:String, default:'', required:true},
        branch:{type: String, default:'', required:true},
        year:{type: Date, required:true}
    },
    mags:[{ type : "ObjectId", ref: 'MAG' }],
    maga:[{ type : "ObjectId", ref: 'MAG' }]
});

UserSchema.pre('save',function(next){
    let user = this ;
    if(!user.isModified('password'))
        return next();

    bcrypt.genSalt(10,(err,salt)=>{
        if(err) return next(err);

        bcrypt.hash(user.password,salt,null,(exrr,hash)=>{
            if(err) return next(err);
            user.password = hash;
            next();
        })
    })
});

UserSchema.methods.comparePassword = function (candiadatePassword) {
    if(this.password != null){
        return bcrypt.compareSync(candiadatePassword,this.password);
    }
    else {
        return false;
    }
};

module.exports = mongoose.model('User',UserSchema,'users');