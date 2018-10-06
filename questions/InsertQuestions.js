var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://heroku_q7zh4kfb:9lp28ki99u4chgg9anjc59fqfl@ds223653.mlab.com:23653/heroku_q7zh4kfb', { 
    useCreateIndex: true,
    useNewUrlParser: true 
});

const {questions} = require('./Questions');


var Schema = mongoose.Schema;
var quizSchema = new Schema({
    category :{ 
        type: String, 
        required: true,
        trim: true,
        enum: ['tvshows', 'movies']
    },
    question: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    options:[{
        type: String,
        required: true,
    }],
    answer:{
        type: Number,
        required: true,
    },
    subcat1:{
        type: String,
        required: false,
    },
    subcat2:{
        type: String,
        required: false,
    },
    subcat3:{
        type: String,
        required: false,
    },
    subcat4:{
        type: String,
        required: false,
    },
    subcat5:{
        type: String,
        required: false,
    }

})



const Quiz = mongoose.model('Quiz', quizSchema);

Quiz.insertMany(questions).then((doc)=>{
    console.log("ok", doc);
}, (err)=>{
    console.log("Error", err);
});



// Quiz.find({subcat1:'50\'s'}).select('answer').then((docs)=>{
//     console.log("FOUND",JSON.stringify(docs, undefined, 2));
// },(err)=>{
//     console.log("error", err)
// })

// Quiz.find({_id:''}).select('answer').then((docs)=>{
//     console.log("FOUND",JSON.stringify(docs, undefined, 2));
// },(err)=>{
//     console.log("error", err)
// })

//queries


