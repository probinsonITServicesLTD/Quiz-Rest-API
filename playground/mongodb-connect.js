const {MongoClient, ObjectID} = require('mongodb');

let obj = new ObjectID();


MongoClient.connect('mongodb://localhost:27017/RestQuizAPI', { useNewUrlParser: true }, (err, client)=>{
    if(err){
        return console.log("unable to connect to server");
    }

    console.log("Connected to mongoDB server");
    const db = client.db('RestQuizAPI');

    db.collection('RestQuizAPI').find().count().then((count)=>{
        console.log("quiz count", count)
    }, (err)=>{
        console.log("unable to fetch", err);
    })

    // db.collection('RestQuizAPI').find().toArray().then((docs)=>{
    //     console.log(JSON.stringify(docs, undefined, 2))
    // }, (err)=>{
    //     console.log("unable to fetch", err);
    // })

    // db.collection('RestQuizAPI').insertOne({
    //     category: 'Sci-Fi',
    //     question: ['What TV series had a character called \'Seven Of Nine\''],
    //     options : ['Star Trek', 'Lost In Space', 'Stargate', 'Battlestar Galactica'],
    //     answer: 0
    // }, (err, result)=>{
    //     if(err){
    //         return console.log("unable to insert", err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2))
    // })

    client.close();
});
