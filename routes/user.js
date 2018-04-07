let router = require('express').Router();
let passport = require('passport');
let User = require('../models/user');
let passportConf = require('../config/passport');
let MAG = require('../models/mag');

router.get('/login', (req, res) => {
    if (req.user) return res.redirect('/dashboard');

    res.render('accounts/signin', {
        layout: 'login',
    });
});


router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
})
);

router.get('/dashboard', (req, res, next) => {
    if (!req.user) {
        res.redirect('/login');
    }
    User.findOne({ _id: req.user._id }, function (err, user) {
        if (err) return next(err);

        MAG.find({ _id: req.user.mags }, (err, magscreat) => {
            if (err) return err;

            MAG.find({ people: req.user._id }, (err,magpart)=> {
                if(err) return err;
                console.log(magpart);
                res.render('accounts/dashboard', { user, magscreat, magpart});
            })

        })


    });
    //res.render('/accounts/login');
});

router.get('/signup', (req, res, next) => {
    res.render('accounts/signup', {
        layout: 'login'
    });
});


router.post('/signup', (req, res, next) => {
    let user = new User();

    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
    user.profile.year = req.body.year;
    user.profile.branch = req.body.branch;

    User.findOne({ email: req.body.email }, function (err, existingUser) {
        if (existingUser) {
            return res.redirect('/signup');
        }
        else {
            user.save((err) => {
                if (err) return next(err);
                console.log("done");
                return res.redirect('/login');
            });
        }
    });
});

router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/login');
});


module.exports = router;