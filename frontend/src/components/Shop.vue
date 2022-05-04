<template>
<div>
  <h2>ForSale</h2>
  <el-table 
  align="center"
  :data="currentPage" 
  style="width: 100%"
  >
    <el-table-column prop="ProductName" label="Product" width="150" />
    <el-table-column prop="SupplierID" label="Supplier" width="150" />
    <el-table-column prop="Num" label="Number" width="150"/>
    <el-table-column prop="Price" label="Price" width="150" align="center">
      <template #default="scope">
        <el-input-number
          v-model="scope.row.Price"
          size="mini"
          :min="1"
          @change="changePrice(scope.row)"></el-input-number>
          
      </template>
    </el-table-column> 

  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :page-size="pageSize"
    :total="this.forSaleTable.length"
    @current-change="setPage">
  </el-pagination>


  <h2>Products</h2>
  <el-table 
  align="center"
  :data="productTable" 
  style="width: 100%"
  >
    <el-table-column prop="ProductName" label="Product" width="130" align="center" />
    <el-table-column prop="SupplierID" label="Supplier" width="130" align="center" />
    <el-table-column prop="StoreHouseID" label="StoreHouse" width="130" align="center"/> 
    <el-table-column prop="Num" label="Remaining" width="130" align="center"/> 

    <el-table-column label="Number" width="150" align="center">
      <template #default="scope">
        <el-input-number
          v-model="scope.row.number"
          size="mini"
          :max="scope.row.Num"
          :min="1"
          @change="changeNumber(scope.$index, scope.row)"></el-input-number>
      </template>
    </el-table-column> 
    <!-- -->
    
    
    <!-- -->
    <el-table-column width="150" align="center">
      <template #default="scope">
        <el-button
          size="mini"
          :disabled="scope.row.number<=scope.row.Num?false:true"
          @click="handleAdd(scope.$index, scope.row)">Add</el-button>
      </template>
    </el-table-column> 
    
  </el-table>

</div>
</template>

<script >
export default {
  data() {
    return {
      page: 1,
      pageSize: 5,
      forSaleTable: [],
      productTable: [],
      priceState: [],
      firstTimeAdd: true
    }
  },
  methods: {
    getForSaleTable(){
      console.log("get forSale")
      this.axios.get('http://127.0.0.1:9000/ni/GetForsale', {
        params: {
          ManagerID: this.firebase.auth().currentUser.email
        }
      })
      .then(response=> {
        let res = JSON.stringify(response.data); 
        let resobj = JSON.parse(res)
        this.forSaleTable = resobj.data
        console.log(this.forSaleTable)
        
      })
      .catch(error => {
        console.log(error);
      })
      .then(function () {
        // always executed
      })
    },
    getHaveTable(){
      console.log("get Have")
      this.axios.get('http://127.0.0.1:9000/ni/GetHave', {
        params: {
          ManagerID: this.firebase.auth().currentUser.email
        }
      })
      .then(response=> {
        let res = JSON.stringify(response.data); 
        let resobj = JSON.parse(res)
        this.productTable = resobj.data
        // console.log("data:")
        // console.log(resobj.data)
        
        for(var i=0;i<this.productTable.length;++i){
          this.productTable[i].number = 1
        }/*
          var found = -1
          for(var j=0;j<this.forSaleTable.length;++j){
            if(this.productTable[i].ProductID == this.forSaleTable[j].ProductID &&
            this.productTable[i].SupplierID == this.forSaleTable[j].SupplierID){
              found = j
            }
          }
          if(found == -1){
            this.productTable[i].price = 150 
          }else{
            // console.log(this.forSaleTable[found].Price)
            this.productTable[i].price = this.forSaleTable[found].Price
          }
           
          // this.productTable[i].price = 150 
            
        }*/
        console.log(this.productTable)
        
      })
      .catch(error => {
        console.log(error);
      })
      .then(function () {
        // always executed
        
      })
    },
    changeNumber(index,row){
      var qwer = false
      if(qwer){
        console.log(index)
        console.log(row)
      }
    },
    ///////////
    changePrice(row) {

      this.axios.post('http://127.0.0.1:9000/ni/PriceChange', {
        // post 參數放這裡
        ManagerID: this.firebase.auth().currentUser.email,
        Price: row.Price,
        SupplierID: row.SupplierID,
        ProductID: row.ProductID
      })
      .then(response => {// 回傳的 response 處理
        console.log(response);
        let res = JSON.stringify(response.data); // 先 變字串
        let resobj = JSON.parse(res) 
        if(resobj.error){
          this.error = resobj.error
        }
        else{
          console.log('change price succeed!')
          this.getForSaleTable() // ----
          this.getHaveTable()
        }

      })
      
      // this.getForSaleTable()
    },
    ////////
    
    handleAdd(index, row) {
      console.log(index, row);
      
      this.axios.post('http://127.0.0.1:9000/nn/forSell', {
        // post 參數放這裡
        StoreHouseID: row.StoreHouseID,
        ShopManagerID: this.firebase.auth().currentUser.email,
        // ShopID: row.ShopID,
        ProductSupplierID: row.SupplierID,
        ProductID: row.ProductID,
        Num: row.number,
        price: row.price
      })
      .then(response => {// 回傳的 response 處理
        console.log(response);
        let res = JSON.stringify(response.data); // 先 變字串
        let resobj = JSON.parse(res) 
        if(resobj.error){
          this.error = resobj.error
        }
        else{
          console.log('add to ForSale succeed!')
          this.getForSaleTable()
          this.getHaveTable()
        }
      })
      
      
    },
    setPage(val){
      console.log(val)
      this.page = val
    }
  },

  created(){
    this.getForSaleTable()
    this.getHaveTable()
    
  },

  computed: {
    currentPage(){
      return this.forSaleTable.slice(this.pageSize*this.page-this.pageSize,this.pageSize*this.page)
    }
  }
}
</script>
<style lang="">
  
</style>