<template>
  <el-table
    ref="singleTable"
    :data="ShopList"
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 30%">
    <el-table-column
      property="ShopList"
      label="Shops"
      width="120">
    </el-table-column>
  </el-table>
  
</template>

<script>
  export default {
    data() {
      return {
        ShopList: [],
        currentRow: null
      }
    },

    methods: {
      handleCurrentChange(val) {
        this.currentRow = val;
        console.log("row: " + this.currentRow);
      },
      getAllShopID(){
        this.axios.get('http://127.0.0.1:9000/getShopList', {
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
            this.ShopList.push({ value: arr[i].ShopID, label: arr[i].ShopName })
          }
          
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
      this.getAllShopID()
    }
  }
</script>