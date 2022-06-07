const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const port = 8888



server.listen(port, function () {
  console.log('server started and listening on port ', port)
})


aedes.on('client', function (client) {
  console.log('new client', client.id)
})

aedes.on('publish', function (packet, client) {
  if (client) {
    console.log('message from client', client.id)
  }
})

aedes.on('subscribe', (subscription, client)=>{
  console.log(subscription)
})