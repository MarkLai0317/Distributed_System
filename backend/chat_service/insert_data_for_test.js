var MongoClient = require('mongodb').MongoClient;
 
// Connect to the db
MongoClient.connect("mongodb://localhost:27017",function(err, client){
 
    if(err) throw err;
   //Write databse Insert/Update/Query code here..
 
    const db = client.db('dis_sys')

    var obj = {
        _id: "90",
        msgs:{
            shop01: [
                {
                Msg: "Hello",
                From: "client01",
                Date: "12345678"
                }, 
                {
                Msg: "Hello you too",
                From: "shop01",
                Date: "12345678"
                }
            ],
            shop02: [
                {
                Msg: "Hello",
                From: "client01",
                Date: "12345678"
                }, 
                {
                Msg: "Hello you too",
                From: "shop01",
                Date: "12345678"
                }
            ]
        }
    }

    var obj2 = {
        _id: "91",
        msgs:{
            shop01: [
                {
                Msg: "Hello",
                From: "client01",
                Date: "12345678"
                }, 
                {
                Msg: "Hello you too",
                From: "shop01",
                Date: "12345678"
                }
            ]
        }
    }

    var manyobj = [obj, obj2]

    console.log(manyobj)

    db.collection('chat').insertMany(manyobj, (err)=>{
        if(err) console.log(err)
        console.log('insertion succeses')
        client.close()
    })

});