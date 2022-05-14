// @鄭宇傑
var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017"

function saveMsg(from, to, msg, date){ //saving message to mongodb 
    // Connect to the db
    MongoClient.connect(url, (err, client)=>{
    
        if(err) throw err;
    
        const db = client.db('dis_sys')
        db.collection('chat').findOne({_id: from}, (err, result)=>{
            if(err) throw err;

            console.log(result.msgs[to])

            const rec = {
                Msg: msg,
                From: from,
                Date: date
            }

            result.msgs[to].push(rec)
            console.log(result.msgs[to])

            db.collection('chat').updateOne({_id: from}, {$set: {msgs: result.msgs}}, (err)=>{
                if(err) throw err;
                client.close();
            })
        })

    });
}

// saveMsg("91", "shop01", "Hello", "12345678")

function delMsg(from, to, msg, date){ //deleting message from mongodb 
    // Connect to the db
    MongoClient.connect(url, (err, client)=>{
    
        if(err) throw err;
    
        const db = client.db('dis_sys')
        db.collection('chat').findOne({_id: from}, (err, result)=>{
            if(err) throw err;

            console.log(result.msgs[to])

            const rec = {
                Msg: msg,
                From: from,
                Date: date
            }

            result.msgs[to].splice(result.msgs[to].indexOf(rec), 1)
            console.log(result.msgs[to])

            db.collection('chat').updateOne({_id: from}, {$set: {msgs: result.msgs}}, (err)=>{
                if(err) throw err;
                client.close();
            })
        })

    });
}

delMsg("91", "shop01", "Hello", "12345678")