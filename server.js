const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const util = require('util');
const hbs = require('hbs');
const methodOverride = require('method-override');
const path = require('path');

let app = express();

let secret = require('./config/secret');
let userRoute = require('./routes/user');
let magRoute = require('./routes/mag');


mongoose.connect(secret.database, (err) => {
    if (err)
        console.log(err);
    else
        console.log('database is connected');
});

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((cookieParser()));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secret.secret,
    store: new MongoStore({ url: secret.database, autoReconnect: true })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});
app.use(methodOverride('_method'));

// app.engine('ejs', ejsMate);
// app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(userRoute);
app.use(magRoute);

app.listen(3000, () => {
    console.log('Server is up');
})