require('./config/config');
const express = require('express');
const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
const {Quiz} = require('./model/Quiz');

var app = express();
const port = process.env.PORT || 3000;

app.get('/getQuizCollectionByCategory', (req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    //requires a category param in the query string ie http://localhost:3000/getSingleQuiz?category=50's
    var category = req.query.category;
    var subcat1 = req.query.subcat1
    console.log("category ", category);
    Quiz.find({
        category : category,
        subcat1 : subcat1
    }).select({
        category: 1,
        question: 2,
        options: 3 
    }).then((quiz)=>{
        res.send({
            quiz : quiz
        })
    }, (err)=>{
        res.status(400).send(e);
    });
});

app.get('/getQuizAnswerById/:id', (req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    //requires a category param in the query string ie http://localhost:3000/getQuizAnswerById/5bb73f8360759c1950961c59
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Quiz.findOne({
        _id : id
    }).select({
        _id: 0,
        answer: 1
    }).then((answer)=>{
        res.send(
            answer
        )
    }, (err)=>{
        res.status(400).send(e);
    });
});

app.listen(port, ()=>{
    console.log(`started on port ${port}`);
});


//heroku git:remote -a quizzle-react

//heroku git:remote -a quiz-rest-api