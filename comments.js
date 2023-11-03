//Create web server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var db = mongoose.connect('mongodb://localhost/comments');//connect to mongodb

//define model
var Comment = require('./models/comment');

//configure app
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//use middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'bower_components')));

//define routes
app.get('/', function(req, res) {
    Comment.find(function(err, comments) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'Comments',
                comments: comments
            });
        }
    });
});

app.get('/comments', function(req, res) {
    Comment.find(function(err, comments) {
        if (err) {
            console.log(err);
        } else {
            res.json(comments);
        }
    });
});

app.post('/comments', function(req, res) {
    var comment = new Comment(req.body);
    comment.save(function(err, comment) {
        if (err) {
            console.log(err);
        } else {
            res.json(comment);
        }
    });
});

app.delete('/comments/:id', function(req, res) {
    Comment.remove({_id: req.params.id}, function(err, comment) {
        if (err) {
            console.log(err);
        } else {
            res.json(comment);
        }
    });
});

//start server
var port = 3000;
app.listen(port, function() {
    console.log('server on! http://localhost:' + port);
});