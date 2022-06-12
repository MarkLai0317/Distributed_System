<template>
  <div >
    <div>message:{{message}}</div>
    <el-input v-model="tempMsg" placeholder=""> </el-input>
    <el-button @click="publish('/chat/1', tempMsg)">send</el-button>
    
    <!--<div>暫時訊息:{{tempMsg}}</div>-->
  </div>
</template>

<script>                                                        
  export default{

    data(){
      return{                   
        message:"",
        tempMsg:"",
      }
    },

    created: function(){
      var mqtt=require('mqtt');
      const client=mqtt.connect('ws://localhost:8083/mqtt')
      client.on('connect', function () {
        console.log('Listen Method Connected')
        client.subscribe('/chat/1',function(){
          console.log('Listen Method Subscribe the Topic: /chat/1')
        })
        client.on('message', (topic, payload) => {
          this.message=payload.toString()
          console.log('Received Message:', topic, payload.toString())
        })
      })
    },

    methods:{
      publish(params, msg){
        var mqtt=require('mqtt');
        const client=mqtt.connect('ws://localhost:8083/mqtt')                         
        client.on('connect', function(){
          //console.log('Publish Method Connected')
          client.subscribe(params,function(){
            //console.log('Publish Method Subscribe the Topic: ', params)
          })
        })

        client.publish(params, msg, { qos: 0, retain: false }, (error) => {
          if (error) {
            console.error(error)
          }else{
            this.message=msg
            console.log('Publish Message: ', msg)
          }
        })
      },
      
  },
  
  watch:{
    message: function(newMsg){
      console.log('Received Message: ', newMsg)
    }
  }
}
</script>
