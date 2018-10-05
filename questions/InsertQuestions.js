var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/RestQuizAPI', { 
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
        enum: ['Sci-Fi', 'TV Shows', 'Movies']
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

// Quiz.insertMany(questions).then((doc)=>{
//     console.log("ok", doc);
// }, (err)=>{
//     console.log("Error", err);
// });



Quiz.find({subcat1:'50\'s'}).select('answer').then((docs)=>{
    console.log("FOUND",JSON.stringify(docs, undefined, 2));
},(err)=>{
    console.log("error", err)
})

Quiz.find({_id:''}).select('answer').then((docs)=>{
    console.log("FOUND",JSON.stringify(docs, undefined, 2));
},(err)=>{
    console.log("error", err)
})

//queries


