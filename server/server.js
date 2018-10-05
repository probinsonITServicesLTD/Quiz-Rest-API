require('./config/config');
const express = require('express');
const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
const {Quiz} = require('./model/Quiz');

var app = express();
const port = process.env.PORT || 3000;

app.get('/getSingleQuizByCategory', (req, res)=>{
    //requires a category param in the query string ie http://localhost:3000/getSingleQuiz?category=50's
    var subcat1 = req.query.category;
    console.log("category ", subcat1);
    Quiz.findOne({
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
    //requires a category param in the query string ie http://localhost:3000/getSingleQuiz?category=50's
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