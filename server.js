//trill server.js
var express = require('express');
var http = require('http');
var app = express();

process.env.NODE_ENV = 'development';

//development only
if (process.env.NODE_ENV === 'production') {
    console.log('-----Server start success in Production version--------');
} else {
    console.log('-----Server start success in Development version--------');
    require('./config/development');
}


app.set('port', process.env.PORT || 5000);
var compression = require('compression');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty')();
var methodOverride = require('method-override');
var logger = require('morgan');
var router = express.Router({
    caseSensitive: true,
    strict: true
});
var logWriter = require('./customLibs/logWriter')();
var EventEmitter = require('events').EventEmitter;
var eventEmitter = new EventEmitter();
var session = require('express-session');
eventEmitter.on('err', function(msg) {
    logWriter.log(msg);
});

var httpServer = http.createServer(app);

app.set('eventEmiter', eventEmitter);

router.use(function (req, res, next) {
    //console.log('%s %s %s', req.method, req.url, req.path);
    next();
});

app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json({reviver: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(session({
    name: 'shodinka_session',
    secret: process.env.CLIENT_SECRET || 'shodinka_session'
}));
app.use(router);


function authenticatedUser(req, res, next) {
    if (req.session.loggedIn && req.session.adminId) {
        console.log('Authenticate cureent User');
        next();
    } else {
        res.send(401);
        next(new Error('User is not in TrillAdmin'));
    }
}

function authenticatedTrill(req, res, next) {
    //TODO: delete this row if '/sign_in' works;
    // -----------------------------------------
    req.session.userId = 1;
    req.session.loggedIn = true; 
    // -----------------------------------------
    
    if (req.session.loggedIn) {
        console.log('Authenticate trill User');
        next();
    } else {
        next(new Error('User is not in Trill'));
    }
}

function previouslyNoLiked(req, res, next) {
    //check realy user have been unliked photo, if Yes next() else nex(new Error('Some text'))
    var userId = req.session.userId;
    if (req.body.photoId){
        knex('image_user_likes').
            where('user_id', userId).andWhere('image_id', req.body.photoId).
            select('id').
            then(function (userLikes){
                if (userLikes.length === 0){
                    next();
                } else {
                    next(new Error('User was liked this Photo'));
                }
            }).
            otherwise( function (err){
                next(new Error(err.stack));
            });
    } else {
        return res.send(500, { error: "Please check input Options, 'photoId' dosen't exists" });
    }
}

function previouslyLiked(req, res, next) {
    //check realy user have been liked photo, if Yes next() else nex(new Error('Some text'))
    var userId = req.session.userId;
    if (req.body.photoId){
        knex('image_user_likes').
            where('user_id', userId).andWhere('image_id', req.body.photoId).
            select('id').
            then(function (userLikes){
                if (userLikes.length !== 0){
                    next();
                } else {
                    next(new Error('User not liked this Photo'));
                }
            }).
            otherwise( function (err){
                next(new Error(err.stack));
            });
    } else {
        return res.send(500, { error: "Please check input Options, 'photoId' dosen't exists" });
    }
}

function previouslyBanned(req, res, next) {
    var userId = req.session.userId;
    if (req.body.photoId){
        knex('image_baned_users').
            where('user_id', userId).andWhere('image_id', req.body.photoId).
            select('id').
            then(function (bannArray){
                if (bannArray.length === 0){
                    next();
                } else {
                    next(new Error('User was banned this Photo'));
                }
            }).
            otherwise( function (err){
                next(new Error(err.stack));
            });
    } else {
        return res.send(500, { error: "Please check input Options, 'photoId' dosen't exists" });
    }
}

app.get('/', function (req, res, next) {
    res.sendfile('index.html');
});

app.get('/authenticated', authenticatedUser, function (req, res, next) {
    res.send(200);
});

// When properly methods will be writen, please remove next() method


httpServer.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
