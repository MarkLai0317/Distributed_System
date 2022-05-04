<template>
  <div>
  <h1>Order History</h1>
  <!--
  <input type="button" @click="add()" />
  -->
  <div class="block">
    <el-pagination layout="prev, pager, next" :total="this.tableData.length" @current-change="setpage" :page-size="pageSize"> </el-pagination>
  </div>

  <div class="table">
    <el-table :data="curPage" style="width: 100%">
        <el-table-column  prop="OrderHistoryID" label="Order ID"  align="center" />
        <el-table-column  prop="ProductName" label="Product"  align="center" />
        <el-table-column prop="SupplierName" label="Supplier" align="center" />
        <el-table-column  prop="Num" label="Number"  align="center" />
        <el-table-column  prop="Time" label="Time"  align="center" />
    </el-table>
  </div>
  </div>
  
</template>

<script>
export default {
  created(){
    this.getSensorData()
  },
  data() {
    return {
      tableData: [
      ],
      page:1,
      pageSize:8,
    }
  },
  computed:{
    curPage(){
      return this.tableData.slice(this.pageSize*this.page-this.pageSize,this.pageSize*this.page)
    }
  },
  methods:{
    /*
    add(){
      this.tableData.push({
        OrderHistoryID: '0',
        Time: '2021',
        ProductName: 'test',
        Num: '1',
        SupplierName:'jojo'
      },)
    },
    */
    setpage(val){
      console.log(val)
      this.page=val
    },
    getSensorData() {
      var email=this.firebase.auth().currentUser.email
      //get 寫法
      this.axios.get('http://127.0.0.1:9000/ni/OrderHistory', {
        params: {
          //get 參數放這裡
          ManagerID:email,
          //page:1,
        }
      })
      .then(response=> {//  get 回來的 資料 處理
        let res = JSON.stringify(response.data); // 先 變字串
        let resobj = JSON.parse(res) // 再變 object
        this.table = resobj
        // 就可以做其他處理 像存到data 裡面
        //console.log(resobj.ProductID)
        console.log(resobj.data)
        for(let i=0;i<resobj.data.length;++i){
          this.tableData.push(resobj.data[i])
        }

      })
      .catch(error => {
        console.log(error);
      })
      .then(function () {
        // always executed
      })
    }
  }
}
</script>