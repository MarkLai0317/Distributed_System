<template>
<div>
    <h4>Select Type: </h4>
    <el-select v-model="TypeValue" placeholder="Select Type" @change="selectType">
      <el-option
        v-for="item in TypeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <!-- <td nowrap>select shop: </td> -->
    <h4>Select Shop</h4>
    <el-select v-model="ShopValue" placeholder="Select Type" @change="selectShop">
      <el-option
        v-for="item in ShopOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

  <el-table :data="currentPage" style="width: 100%" align="center">
    
    <el-table-column prop="ProductName" label="Product" width="150" align="center"/>
    <el-table-column prop="ShopName" label="Shop" width="150" align="center"/>
    <el-table-column prop="RemainNumber" label="Remain" width="150" align="center"/>
    <el-table-column prop="Price" label="Price" width="150" align="center"/>
    <el-table-column prop="Type" label="Type" width="150" align="center"/>
    <!-- -->
    <el-table-column width="150" align="center">
      <template #default="scope" >
        <el-button
          size="mini"
          :disabled="scope.row.RemainNumber<1?true:false"
          @click="pressAdd(scope.$index, scope.row)">Add</el-button>
      </template>
    </el-table-column>
    <!-- -->

  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :page-size="pageSize"
    :total=maxPage
    @current-change="getPage">
  </el-pagination>
  <!-- test button -->
     
</div>
</template>

<script >
export default {
  data() {
    return {
      page: 1,
      maxPage: 50,
      pageSize: 10,
      currentType: '',
      currentShopName: '', 
      currentPage: [],
      TypeValue: '',
      ShopValue: '',
      // api
      TypeOptions: [{
          value: '',
          label: 'all'
        }],
      ShopOptions: [{
          value: '',
          label: 'all'
        },]
    }
  },
  created(){
    this.getPage(1),
    this.getMaxPage(),
    this.getAllType(),
    this.getAllShopID()
  },
  methods: {
    // get the current page
    getPage(val) {

      this.page = val
      //get 寫法
      this.axios.get('http://127.0.0.1:9000/nn/searchProduct', {
        params: {
          //get 參數放這裡
          ShopID: this.currentShopName, // ShopName ---
          Type: this.currentType,
          page: val
        }
      })
      .then(response=> {//  get 回來的 資料 處理
        let res = JSON.stringify(response.data); // 先 變字串
        let resobj = JSON.parse(res) // 再變 object
        this.currentPage = resobj.data
        // 就可以做其他處理 像存到data 裡面
        console.log(resobj.data)
        console.log(val)
      
      })
      .catch(error => {
        console.log(error);
      })
      .then(function () {
        // always executed
      })
    },
    //////
    pressAdd(index,row) {
      console.log(index)
      console.log(row)
      this.axios.post('http://127.0.0.1:9000/nn/add', {
        // post 參數放這裡
        CustomerID: this.firebase.auth().currentUser.email,
        ShopID: row.ShopID,
        ProductSupplierID: row.SupplierID,
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
          console.log('add succeed!')
        }

      })
      .catch(error => {
        console.log(error)
        this.error = 'register fail'
        console.log(this.page)
      });
    },
    ////
    selectType(val){
      this.currentType = val
      this.getPage(this.page)
      this.getMaxPage()
    },
    selectShop(val){
      this.currentShopName = val
      this.getPage(this.page)
      this.getMaxPage()
    },
    // get the total number of pages 
    getMaxPage(){
      this.axios.get('http://127.0.0.1:9000/nn/maxPage', {
        params: {
          //get 參數
          ShopID: this.currentShopName, 
          Type: this.currentType,
        }
      })
      .then(response=> {
        let res = JSON.stringify(response.data); 
        let resobj = JSON.parse(res)
        console.log(resobj)
        this.maxPage = (resobj.page*10)
      })
      .catch(error => {
        console.log(error);
      })
      .then(function () {
        // always executed
      })

    },
    getAllType(){
      this.axios.get('http://127.0.0.1:9000/nn/getType', {
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
          this.TypeOptions.push({ value: arr[i].Type, label:arr[i].Type })
        }

        
      })
      .catch(error => {
        console.log(error);
      })
      .then(function () {
        // always executed
      })
    },
    getAllShopID(){
      this.axios.get('http://127.0.0.1:9000/nn/getShopList', {
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
          this.ShopOptions.push({ value: arr[i].ShopID, label: arr[i].ShopName })
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
  computed: {
    
  }
}
</script>
<style lang="">
  
</style>