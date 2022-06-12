const express = require('express');
const config = require('./config');
const path = require('path');
const app = express();
const port = 9000 || process.env.PORT;
//const quotesRouter = require('./routes/quotes');
//const markRouter = require('./routes/mark');

const customerRouter = require('./routes/customer.js')

const managerRouter = require('./routes/manager.js')
const chatRouter = require('./routes/chat.js')
const testChatRouter = require('./routes/test_chat.js')




var EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const { v4: uuidv4 } = require('uuid');

var mqtt = require('mqtt')

var option = {  
    qos:2,
}
var client = mqtt.connect('mqtt://localhost:8888', {clientId : 'server'})

var shardKeys = ['sharding/customer-1', 'sharding/customer-2', 'sharding/manager-1','sharding/chatRecord']
// shardNum 可自己變換 看要哪個
const shard =  (shardNum, serviceId, parameters) => {
    

  return new Promise((resolve, reject) => {
  // This assumes that the events are mutually exclusive
    let transactionId = uuidv4()
    
    let request = {
      serviceId: serviceId,
      transactionId: transactionId,
      parameters: parameters
    }
    client.subscribe(transactionId, (err)=>{
      client.publish(shardKeys[shardNum], JSON.stringify(request))
    })

    myEmitter.on(transactionId, (result)=>{
      client.unsubscribe(transactionId)
      resolve(result)
    })

  });
}

var cors = require('cors');

app.use(cors({
  origin: config.cors.origin
}))

app.use(express.json());



app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

//app.use('/quotes', quotesRouter);
//app.use('/mark', markRouter({shard: shard}));

app.use('/customer', customerRouter({shard:shard}))
app.use('/manager', managerRouter({shard:shard}))
// app.use('/chat', chatRouter({shard: shard}))
app.use('/chat', testChatRouter({shard:shard}))

app.use('/web',express.static(path.join(__dirname, '../frontend/web')));
//                                             以上是dist的路徑 看你放哪
//                                         以下是dist的路徑/index.html

console.log(path.join(__dirname, '../frontend/dist'))
// app.get('/web', (req,res) => {
//    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
// });                                  


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

client.on('message', (topic, message, packet) =>{
  
  let result = JSON.parse(message)

  myEmitter.emit(topic, result)
})
