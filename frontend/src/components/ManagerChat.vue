<template>
  <el-container>
    <el-header>
      <h2>Chat Room</h2>
    </el-header>
    <el-container>

      <el-aside>
        <el-table ref="singleTable" :data="CustomerList" highlight-current-row @current-change="handleCurrentChange"
          max-height="1000" style="width: 50%">
          <el-table-column property="CustomerName" label="Customers" width="200">
          </el-table-column>
        </el-table>
      </el-aside>

      <el-main>
        <div v-for="msg in CurrentMsg" v-bind:key="msg.id" align="left">
          <div v-if="msg.From === this.firebase.auth().currentUser.email ">You : {{msg.Msg}}</div>
          <div v-else>{{this.CurrentRow.CustomerName}} : {{msg.Msg}}</div>
        </div>

        <div>message:{{message}}</div>
        <el-input v-model="tempMsg" placeholder="" style="width:500px"></el-input>
        <el-button  @click="publish('/chat/'+this.CurrentRow.CustomerID.toString(), tempMsg)">send</el-button>

      </el-main>

    </el-container>


  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        CustomerList:[],
        CurrentRow: null,
        HistoryMsg: [],
        CurrentMsg: [], // test
        message:"", // message recieved
        tempMsg:"", // imput message
      }
    },

    methods: {
      handleCurrentChange(val) {
        // !! this is currently hard coded due to some uncertainty
        this.CurrentRow = val;
        console.log("val,this.CurrentRow", this.CurrentRow);
        console.log(val.CustomerID);
        this.CurrentMsg = this.HistoryMsg[this.CurrentRow.CustomerID];
        console.log("currentMsg", this.CurrentMsg);
      },
      
      getHistoryMsg(){
          this.axios.get('http://127.0.0.1:9000/chat/getHistory', {
          params: {
            UserId: this.firebase.auth().currentUser.email
          }
        })
        .then(response=> {
          let res = JSON.stringify(response.data); 
          let resobj = JSON.parse(res);
          console.log("history", resobj);
          this.HistoryMsg = resobj;
          var IDs = Object.keys(this.HistoryMsg);
          for (var i = 0; i < IDs.length; ++i) {
            this.CustomerList.push({CustomerID: IDs[i], CustomerName: "Client"+IDs[i][7]+IDs[i][8]});
          }
          
          
          
        })
        .catch(error => {
          console.log(error);
        })
        .then(function () {
          // always executed
          
        })

      },
      connectBroker(){
        var mqtt=require('mqtt');
        const client=mqtt.connect('ws://localhost:8083/mqtt')

        var Email = this.firebase.auth().currentUser.email;
        var receiveMsgObj;

        client.on('connect', () =>{
          console.log('Listen Method Connected');
          client.subscribe( '/chat/' + Email ,function(){
            console.log('subscribed /chat/' + Email);
          })
          client.on('message', (topic, payload) => {

            // receive message
            receiveMsgObj = JSON.parse(payload.toString());
            console.log("received", receiveMsgObj);
            this.CurrentMsg.push(receiveMsgObj);
            
            
          });
        })
      },
      publish(params, msg){
        
        this.tempMsg = ""; // emty the input

        var mqtt=require('mqtt');
        const client=mqtt.connect('ws://localhost:8083/mqtt')    

        // convert msg to object
         var msgObj = { "Msg" : msg, 
          "From" : this.firebase.auth().currentUser.email,
          "Date" : Date.now()
        }

        // add to current message
        this.CurrentMsg.push(msgObj);
        
        // send
        client.on('connect', function () {
          console.log('Publish Method Connected');
          client.publish(params, JSON.stringify(msgObj), function(){
            console.log('published ', msgObj);
          })
        })                   
        
      }
    },

    created(){
      this.getHistoryMsg(),
      this.connectBroker()
    },
    watch:{
      message: function(newMsg){
        
        // console.log('Received Message: ', newMsg)
        var newMsgObj = JSON.parse(newMsg);
        console.log(typeof(newMsgObj));
        

      }
    }
  }
</script>