<template>
  <el-container>
    <el-header>
      <h2>Chat Room</h2>
    </el-header>
    <el-container>

      <el-aside>
        <el-table ref="singleTable" :data="ShopList" highlight-current-row @current-change="handleCurrentChange"
          max-height="1000" style="width: 30%">
          <el-table-column property="ShopName" label="Shops" width="120">
          </el-table-column>
        </el-table>
      </el-aside>

      <el-main>
        <div v-for="msg in CurrentMsg" v-bind:key="msg.id" align="left">
          <div v-if="msg.From === this.firebase.auth().currentUser.email ">You : {{msg.Msg}}</div>
          <div v-else>{{CurrentRow.ShopName}} : {{msg.Msg}}</div>
        </div>

        <div>message:{{message}}</div>
        <el-input v-model="tempMsg" placeholder="" style="width:500px"></el-input>
        <el-button @click="publish('/chat/1087030'+(this.CurrentRow.ShopID-30).toString()+'@nccu.edu.tw', tempMsg)">send</el-button>

      </el-main>

    </el-container>


  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        ShopList: [], 
        CurrentRow: null,
        HistoryMsg: [],
        CurrentMsg: [],
        message:"", // message recieved
        tempMsg:"", // imput message
      }
    },

    methods: {
      handleCurrentChange(val) {
        // !! this is currently hard coded due to some uncertainty
        this.CurrentRow = val;
        console.log("val,this.CurrentRow", this.CurrentRow);
        console.log(val.ShopID);
        this.CurrentMsg = this.HistoryMsg["1087030" + (val.ShopID-30).toString() + "@nccu.edu.tw"];
        console.log("currentMsg", this.CurrentMsg);
      },
      getAllShopID(){
        this.axios.get('http://127.0.0.1:9000/customer/getShopList', {
          params: {
            // no parameters
          }
        })
        .then(response=> {
          let res = JSON.stringify(response.data); 
          let resobj = JSON.parse(res)
          let arr = resobj.data
          console.log(arr)
          for(var i=0;i<arr.length;++i){
            this.ShopList.push({ ShopID: arr[i].ShopID, ShopName: arr[i].ShopName })
          }
          
        })
        .catch(error => {
          console.log(error);
        })
        .then(function () {
          // always executed
        })
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
          console.log(resobj);
          this.HistoryMsg = resobj;
          
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
        var receivedMsgObj;

        client.on('connect', () => {
          
          console.log('Listen Method Connected');
          client.subscribe( '/chat/' + Email ,function(){
            console.log('subscribed /chat/' + Email);
          });
          client.on('message', (topic, payload) => {
            
            receivedMsgObj = JSON.parse(payload.toString());
            console.log(receivedMsgObj);
            this.CurrentMsg.push(receivedMsgObj);
            
          });
          
        })
      },
      publish(params, msg){
        
        this.tempMsg = ""; // emty the input

        var mqtt=require('mqtt');
        const client=mqtt.connect('ws://localhost:8083/mqtt')    

         var msgObj = { "Msg" : msg, 
          "From" : this.firebase.auth().currentUser.email,
          "Date" : Date.now()
        }

        this.CurrentMsg.push(msgObj);

        client.on('connect', function () {
          console.log('Publish Method Connected');
          client.publish(params, JSON.stringify(msgObj), function(){
            console.log('published ', msgObj);
          })
        })                   
        
      }
    },

    created(){
      this.getAllShopID(),
      this.getHistoryMsg(),
      this.connectBroker()
    },
    watch:{
      message: function(newMsg){
        console.log('Received Message: ', newMsg)
        this.message = newMsg
      }
    }
  }
</script>