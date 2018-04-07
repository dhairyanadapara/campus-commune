let router = require('express').Router();
let User = require('../models/user');
let MAG = require('../models/mag');
const { ObjectId } = require('mongodb');

router.get('/meetandgreet', (req, res) => {
    MAG.find({}, (err, mags) => {
        if (err) return err;
        console.log(mags);
        res.render('meetandgreet/meetings', { mags });
    });
});

router.get('/addmag', (req, res) => {
    res.render('meetandgreet/addmag');
})

router.post('/meetandgreet', (req, res, next) => {
    let mag = new MAG();

    mag.people.push(req.user._id);
    mag._id = new ObjectId();
    mag.topic = req.body.topic;
    mag.title = req.body.title;
    mag.description = req.body.description;
    mag.place = req.body.place;
    mag.date = req.body.date;
    mag.time = req.body.time;

    mag.save((err) => {
        if (err) return next(err);
      console.log(mag._id);
        User.findOneAndUpdate({_id : req.user._id}, {$push:{ mags : mag._id }}, (err,user)=>{
            if(err) return next(err);
            console.log('Sucessful');
            res.redirect('/meetandgreet');
        })
    });
});

router.get('/magdetails', (req, res) => {
    res.render('meetandgreet/magdetails');
})

router.delete('/magdelete/:id',(req,res)=>{
    let uid= req.params.id;
    console.log(uid);
    MAG.findByIdAndRemove(uid,(err)=>{
        if(err) return err;

        res.redirect('/dashboard');
    })
})

module.exports = router;