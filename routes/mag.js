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


    mag._id = new ObjectId();
    mag.topic = req.body.topic;
    mag.title = req.body.title;
    mag.description = req.body.description;
    mag.place = req.body.place;
    mag.date = req.body.date;
    mag.people.push(req.user._id);
    mag.time = req.body.time;

    mag.save((err) => {
        if (err) return next(err);
        console.log(mag._id);
        User.findOne({ _id: req.user._id }, (err, user) => {
            if (err) return err;

            user.mags.push(mag._id),
                user.save((err) => {
                    if (err) return next(err);
                    console.log('Sucessful');
                    res.redirect('/meetandgreet');
                })
        })
    });
});

router.get('/magdetails', (req, res) => {
    res.render('meetandgreet/magdetails');
})

router.delete('/magdelete/:id', (req, res) => {
    let mid = req.params.id;

    MAG.findByIdAndRemove(mid, (err) => {
        if (err) return err;

        res.redirect('/dashboard');
    })
})

router.patch('/magdetails/:id', (req, res) => {
    let mid = req.params.id;
    console.log(mid);

    let uid = req.user._id;
    console.log(uid);
    MAG.findById(mid, (err, mag) => {
        if (err) return err;
        mag.people.push(uid);

        mag.save((err) => {
            if (err) return err;

            User.findById(uid, (err, user) => {
                console.log(user);
                console.log(mid);
                user.maga.push(mid);

                user.save((err) => {
                    if (err) return err;

                    console.log("Successful");
                    res.redirect('/meetandgreet');
                });
            });
        });
    })
});
module.exports = router;