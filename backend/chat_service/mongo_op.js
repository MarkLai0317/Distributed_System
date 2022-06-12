// @鄭宇傑
var MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017"

async function saveMsg(from, to, msg, date){ //saving message to mongodb 
    const record = {
        Msg: msg,
        From: from,
        Date: date
    }

    const client = await MongoClient.connect(url)
    const db = client.db('dis_sys')
    let collection = db.collection('chat')

    // saving message to sender's chat history
    let result = await collection.findOne({_id: from})

    if(result == null){ //if the sender's chat history is empty
        let obj = { //create a new chat history
            _id: from,
            msgs: {
                [to]: [record]
            }
        }
        await collection.insertOne(obj)
    }
    else{
        let msgs = result.msgs
        if(msgs[to] == undefined){
            msgs[to] = [record] //if there is no message in this shop, create a new array
        }
        else{
            msgs[to].push(record) //if there is message in this shop, push the new message to the array
        }
        await collection.updateOne({_id: from}, {$set: {msgs: msgs}})
    }

    // saving message to receiver's chat history
    result = await collection.findOne({_id: to})

    if(result == null){ //if the receiver's chat history is empty
        let obj = { //create a new chat history
            _id: to,
            msgs: {
                [from]: [record]
            }
        }
        await collection.insertOne(obj)
    }
    else{
        let msgs = result.msgs
        if(msgs[from] == undefined){
            msgs[from] = [record] //if there is no message in this shop, create a new array
        }
        else{
            msgs[from].push(record) //if there is message in this shop, push the new message to the array
        }
        await collection.updateOne({_id: to}, {$set: {msgs: msgs}})
    }

    client.close()
}

saveMsg("92", "93", "Hello", "12345678")

async function delMsg(from, to, msg, date){ //deleting message from mongodb 
    
}

// delMsg("91", "shop01", "Hello", "12345678")

module.exports = { saveMsg }