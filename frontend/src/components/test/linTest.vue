<template>
  <div id="app">
    <input type="text" v-model="tempMsg" placeholder="請輸入訊息"/>
    <button @click="publish('/chat/1', tempMsg)">提交訊息</button>
    <div>訊息:{{message}}</div>
    <!--<div>暫時訊息:{{tempMsg}}</div>-->
  </div>
</template>

<script>                                                        
  export default{
    name:'app',
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
      /*listen(params){
        var mqtt=require('mqtt');
        const client=mqtt.connect('ws://localhost:8083/mqtt')
        client.on('connect', function () {
          console.log('Listen Method Connected')
          client.subscribe(params,function(){
            console.log('Listen Method Subscribe the Topic: ', params)
        })
          client.on('message', (topic, payload) => {
            console.log('Received Message:', topic, payload.toString())
        })
      })
    }*/
  },
  
  watch:{
    message: function(newMsg){
      console.log('Received Message: ', newMsg)
    }
  }
}
</script>

<!--
<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <table style="width:100%">
          <tr align="center">
            <th style="width:33.33%">Name</th>
            <th style="width:33.33%">Quantity</th>
            <th style="width:33.33%">Price</th>
          </tr>
          <tr v-for="item in props.row.data" :key="item.id" align="center">
            <td>{{item.good_name}}</td>
            <td>{{item.quantity}}</td>
            <td>{{item.price}}</td>
          </tr>
        </table>
      </template>
    </el-table-column>
    <el-table-column label="Date" prop="date" align="center"/>
    <el-table-column label="HID" prop="h_id" align="center"/>
    <el-table-column label="Customer" prop="customer" align="center"/>
    <el-table-column label="Total Price" prop="total_price" align="center"/>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03',
          data: [{good_name: 'Coca Cola', quantity: 30, price: 25},
                 {good_name: 'Fish', quantity: 2, price: 300},
                 {good_name: 'Pepper', quantity: 10, price: 30}
          ],
          h_id: '1',
          customer: 'Tom',
          total_price: 300,
        },
        {
          date: '2016-05-02',
          data: [{good_name: 'Banana', quantity: 10, price: 15},
                 {good_name: 'Book', quantity: 3, price: 350}
          ],
          h_id: '2',
          customer: 'Jack',
          total_price: 50,
        },
        {
          date: '2016-05-04',
          data: [{good_name: 'Flower', quantity: 2, price: 250},
                 {good_name: 'Battery', quantity: 5, price: 130},
                 {good_name: 'Pencil', quantity: 10, price: 15},
                 {good_name: 'Wine', quantity: 3, price: 799}
          ],
          h_id: '3',
          customer: 'James',
          total_price: 50,
        },
        {
          date: '2016-05-01',
          data: [{good_name: 'Milk', quantity: 2, price: 149},
          ],
          h_id: '4',
          customer: 'Jimmy',
          total_price: 50,
        },
        {
          date: '2016-05-08',
          data: [{good_name: 'Tomato', quantity: 3, price: 20},
                 {good_name: 'Patato', quantity: 5, price: 30},
                 {good_name: 'Orange Juice', quantity: 1, price: 149}
          ],
          h_id: '5',
          customer: 'Chris',
          total_price: 50,
        },
        {
          date: '2016-05-06',
          data: [{good_name: 'Oil', quantity: 500, price: 500},
                 {good_name: 'French Fries', quantity: 100, price: 49},
                 {good_name: 'Chicken Nuggets', quantity: 50, price: 60},
                 {good_name: 'Hot Dog', quantity: 70, price: 30},
                 {good_name: 'Pizza', quantity: 20, price: 230},
          ],
          h_id: '6',
          customer: 'Stanley',
          total_price: 50,
        },
        {
          date: '2016-05-07',
          data: [{good_name: 'Marijuana', quantity: 87, price: 1500},
          ],
          h_id: '7',
          customer: 'Toyz',
          total_price: 50,
        },
      ],
    }
  },
}
</script>
-->