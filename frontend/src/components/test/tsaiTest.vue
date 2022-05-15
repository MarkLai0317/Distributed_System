<template>
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
        this.CurrentRow = val;
        console.log(this.CurrentRow);
        this.CurrentMsg = this.HistoryMsg[val.ShopID];
        console.log(this.CurrentMsg);
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
          this.axios.get('http://127.0.0.1:9000/msg/getHistory', {
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

      }
    },

    created(){
      this.getAllShopID(),
      this.getHistoryMsg()
    }
  }
</script>