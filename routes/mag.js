let router = require('express').Router();
let User = require('../models/user');
let MAG = require('../models/mag');

router.get('/meetandgreet',(req,res)=>{
    MAG.find({},(err,mags)=>{
        if(err) return err;
        console.log(mags);
        res.render('meetandgreet/meetings',{ mags });
    });
});

router.get('/addmag',(req,res)=>{
    res.render('meetandgreet/addmag');
})

router.post('/meetandgreet',(req,res,next)=>{
    let mag = new MAG();

    mag.topic = req.body.topic;
    mag.title = req.body.title;
    mag.description = req.body.description;
    mag.place = req.body.place;
    mag.date = req.body.date;
    mag.time = req.body.time;

    mag.save((err)=>{
        if(err) return next(err);

        res.redirect('/meetandgreet');
    });
});

router.get('/magdetails',(req,res)=>{
    res.render('/meetandgreet/magdetails');
})

module.exports = router;