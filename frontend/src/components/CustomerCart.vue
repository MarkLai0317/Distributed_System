<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="tableData" width="55" />
    <el-table-column label="Name" show-overflow-tooltip align="center">
      <template #default="scope">{{ scope.row.Name }}</template>
    </el-table-column>
    <el-table-column prop="ShopID" label="Shop" show-overflow-tooltip align="center"/>
    <el-table-column prop="RemainNumber" label="Remain" show-overflow-tooltip align="center"/>
    <el-table-column prop="Price" label="Price" show-overflow-tooltip align="center"/>
    <el-table-column width="100" align="center">
      <template #default="scope">
        <el-button @click="toggleMinus(scope.row)"
        :disabled="scope.row.NumberInCart<=1">-</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="NumberInCart" label="Quantity" show-overflow-tooltip align="center"/>
    <el-table-column width="100" align="center">
      <template #default="scope">
        <el-button @click="toggleAdd(scope.row)"
        :disabled="scope.row.NumberInCart>=scope.row.RemainNumber">+</el-button>
      </template>
    </el-table-column>
    <el-table-column width="100" align="center">
      <template #default="scope">
        <el-button @click="toggleDelete(scope.row)">delete</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div>
    <p>Total Price: {{countTotal()}}</p>
  </div>
  <div style="margin-top: 20px">
    <el-button @click="toggleSubmit()" round>Submit</el-button>
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
    }
  },

  methods: {
    toggleDelete(row){
      this.axios.post("http://127.0.0.1:9000/nn/deleteCart", {
            // post 參數放這裡
            CustomerID: this.firebase.auth().currentUser.email,
            ShopID: row.ShopID,
            ProductSupplierID: row.ProductSupplierID,
            ProductID: row.ProductID,
          })
          .then(response => {// 回傳的 response 處理
            console.log(response);
            let res = JSON.stringify(response.data); // 先 變字串
          let resobj = JSON.parse(res) 
          if(resobj.error){
            this.error = resobj.error
          }
          else{
            console.log('success')
            this.getSensorData()
          }
        })
        .catch(error => {
          console.log(error)
          this.error = 'delete fail'
          console.log(this.page)
        });
    },

    countTotal(){
      var total=0
      for(var i=0;i<this.tableData.length;++i){
        total += this.tableData[i].Price * this.tableData[i].NumberInCart
      }
      return total
    },
    toggleMinus(row) {
        
          this.axios.post("http://127.0.0.1:9000/nn/subtractProductNumInCart", {
            // post 參數放這裡
            CustomerID: this.firebase.auth().currentUser.email,
            ShopID: row.ShopID,
            ProductSupplierID: row.ProductSupplierID,
            ProductID: row.ProductID,
          })
          .then(response => {// 回傳的 response 處理
            console.log(response);
            let res = JSON.stringify(response.data); // 先 變字串
          let resobj = JSON.parse(res) 
          if(resobj.error){
            this.error = resobj.error
          }
          else{
            console.log('success')
            this.getSensorData()
          }
        })
        .catch(error => {
          console.log(error)
          this.error = 'subtract fail'
          console.log(this.page)
        });
      
    },
    toggleAdd(row) {
        
          this.axios.post("http://127.0.0.1:9000/nn/addProductNumInCart", {
            // post 參數放這裡
            CustomerID: this.firebase.auth().currentUser.email,
            ShopID: row.ShopID,
            ProductSupplierID: row.ProductSupplierID,
            ProductID: row.ProductID,
          })
          .then(response => {// 回傳的 response 處理
            console.log(response);
            let res = JSON.stringify(response.data); // 先 變字串
          let resobj = JSON.parse(res) 
          if(resobj.error){
            this.error = resobj.error
          }
          else{
            console.log('success')
            this.getSensorData()
          }
        })
        .catch(error => {
          console.log(error)
          this.error = 'add fail'
          console.log(this.page)
        });
      
    },
    toggleSubmit() {
        //post 寫法
      this.axios.post('http://127.0.0.1:9000/nn/buy', {
        // post 參數放這裡
        CustomerID: this.firebase.auth().currentUser.email,
      })
      .then(response => {// 回傳的 response 處理
        console.log(response);
        let res = JSON.stringify(response.data); // 先 變字串
        let resobj = JSON.parse(res) 
        if(resobj.error){
          this.error = resobj.error
        }
        else{
          console.log('success')
          this.getSensorData()
        }
      })
      .catch(error => {
        console.log(error)
        this.error = 'buy fail'
        console.log(this.page)
      });
    },
    getSensorData() {
        this.axios.get('http://127.0.0.1:9000/nn/clickCart', {
        params: {
          //get 參數放這裡
          CustomerID: this.firebase.auth().currentUser.email ,
          
        }
      })
      .then(response=> {//  get 回來的 資料 處理
        let res = JSON.stringify(response.data); // 先變字串
        let resobj = JSON.parse(res) // 再變 object
        this.tableData = resobj.data
        // 就可以做其他處理 像存到data 裡面
        console.log(resobj.data)
      })
      .catch(error => {
        console.log(error);
      })
    }
  },
}
</script>
