var MongoClient = require('mongodb').MongoClient;
 
// Connect to the db
MongoClient.connect("mongodb://localhost:27017",function(err, client){
 
    if(err) throw err;
 
    const db = client.db('dis_sys')

    var obj = {
        _id: "108703031@nccu.edu.tw",
        msgs:{
            "108703060@nccu.edu.tw": [
                {
                Msg: "Hello",
                From: "108703031@nccu.edu.tw",
                Date: "12345678"
                }, 
                {
                Msg: "Hi",
                From: "108703060@nccu.edu.tw",
                Date: "12345678"
                }
            ],
            "108703061@nccu.edu.tw": [
                {
                Msg: "Hello",
                From: "108703031@nccu.edu.tw",
                Date: "12345678"
                }, 
                {
                Msg: "Hi",
                From: "108703061@nccu.edu.tw",
                Date: "12345678"
                }
            ]
        }
    }

    var obj2 = {
        _id: "108703030@nccu.edu.tw",
        msgs:{
            "108703060@nccu.edu.tw": [
                {
                Msg: "Hello",
                From: "108703030@nccu.edu.tw",
                Date: "12345678"
                }, 
                {
                Msg: "Hi",
                From: "108703060@nccu.edu.tw",
                Date: "12345678"
                }
            ]
        }
    }

    var obj3 = {
        _id: "108703060@nccu.edu.tw",
        msgs:{
            "108703030@nccu.edu.tw": [
                {
                Msg: "Hello",
                From: "108703030@nccu.edu.tw",
                Date: "12345678"
                }, 
                {
                Msg: "Hi",
                From: "108703060@nccu.edu.tw",
                Date: "12345678"
                }
            ],
            "108703031@nccu.edu.tw": [
                {
                Msg: "hi ~",
                From: "108703031@nccu.edu.tw",
                Date: "12345678"
                }, 
                {
                Msg: "Hello !",
                From: "108703060@nccu.edu.tw",
                Date: "12345678"
                }
            ]
        }
    }
        

 

    var manyobj = [obj, obj2, obj3]

    console.log(manyobj)

    db.collection('chat').insertMany(manyobj, (err)=>{
        if(err) console.log(err)
        console.log('insertion succeses')
        client.close()
    })

});