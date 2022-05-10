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

            console.log(result.msgs.shop01)
            
            client.close()
        })

    });
}

saveMsg("90", "shop01", "Hello", "12345678")
