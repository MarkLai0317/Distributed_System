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
          <tr v-for="item in props.row.Receipt" :key="item.id" align="center">
            <td>{{item.ProductName}}</td>
            <td>{{item.Num}}</td>
            <td>{{item.Price}}</td>
          </tr>
        </table>
      </template>
    </el-table-column>
    <el-table-column label="Date" prop="Receipt[0].Time" align="center"/>
    <el-table-column label="HID" prop="HistoryID" align="center"/>
    <el-table-column label="Customer" prop="CustomerID" align="center"/>
    <el-table-column label="Total Price" prop="TotalPrice" align="center"/>
  </el-table>
</template>

<script>
export default {
  created(){
    this.getSensorData()
    
  },
  data() {
    return {
      tableData: [{
      }],
    }
  },
  methods:{
    getSensorData() {

      //get 寫法
        this.axios.get('http://127.0.0.1:9000/ni/TradeHistory', {
        params: {
          //get 參數放這裡
          ManagerID: this.firebase.auth().currentUser.email,
          page: 1
        }
      })
      .then(response=> {//  get 回來的 資料 處理
        let res = JSON.stringify(response.data); // 先 變字串
        let resobj = JSON.parse(res) // 再變 object
        this.tableData = resobj.data

        // 就可以做其他處理 像存到data 裡面
        console.log(this.tableData)
      })
      .catch(error => {
        console.log(error);
      })
    },
  }
}
</script>