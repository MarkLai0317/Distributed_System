<template>
  <el-container>
    <el-header>
      <h2>Chat Room</h2>
    </el-header> 
    <el-container>

      <el-aside>
        <el-table
          ref="singleTable"
          :data="ShopList"
          highlight-current-row
          @current-change="handleCurrentChange"
          max-height="1000"
          style="width: 30%">
          <el-table-column
            property="ShopName"
            label="Shops"
            width="120">
          </el-table-column>
        </el-table>
      </el-aside>

      <el-main>
        <p v-for="msg in CurrentMsg" 
        v-bind:key="msg.id"
        align = "left">
        {{msg.From}}:{{msg.Msg}}
        </p>
      </el-main>
      
    </el-container> 

    
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        ShopList: [{ShopName: "Shop01", ShopID: "01"}], // should be empty. (the current shopList is for testing)
        CurrentRow: null,
        HistoryMsg: {},
        CurrentMsg: {}
      }
    },

    methods: {
      handleCurrentChange(val) {
        // !! this is currently hard coded due to some uncertainty
        this.CurrentRow = val;
        console.log("val,this.CurrentRow", this.CurrentRow);
        console.log(val.ShopID);
        this.CurrentMsg = this.HistoryMsg["shop"+val.ShopID];
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
            // UserId: this.firebase.auth().currentUser.email
            UserId: "90"
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

      }
    },

    created(){
      this.getAllShopID(),
      this.getHistoryMsg()
    }
  }
</script>