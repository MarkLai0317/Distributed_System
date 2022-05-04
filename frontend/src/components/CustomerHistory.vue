<template>
  <div>
    <p>Order history</p>
    <el-container style="margin-left: 650px">
      
      
      <el-main>
        <el-row :gutter="30" justify="start">
          <el-col :span="2">
            <div class="grid-content">{{ order.Date }}</div>
          </el-col>
          <el-col :span="4" :offset="0">
            <div class="grid-content">trade ID:{{ order.Oid }}</div>
          </el-col>
          <el-col :span="3" :offset="0">
            <div class="grid-content">交易價格 ${{ order.Price }}</div>
          </el-col>
        </el-row>
        <el-row>
        
          <el-table :data="table" >
            <el-table-column prop="ProductName" label="Name" width="220" />
            <el-table-column prop="ShopName" label="Shop" width="150" />
            <el-table-column prop="Num" label="Number" width="80" />
            <el-table-column prop="Price" label="Price" width="100" />
          </el-table>
        
        </el-row>
      </el-main>
      <p />
    </el-container>
    <el-button @click="lastPage" 
    :disabled="this.page==1"
    size="mini">Last Page</el-button>
    <el-box>&nbsp;&nbsp;&nbsp;&nbsp; {{this.page}} &nbsp;&nbsp; </el-box>
    <el-button @click="nextPage" 
    :disabled="this.page==this.maxPage"
    size="mini">Next Page</el-button>
  </div>
</template>

<script lang="" scoped>
export default {
  data() {
    return {
      CustomerID: this.firebase.auth().currentUser.email,
      page: 1,
      order:{
        Date: 'haha',
        Oid: '123123',
        Price: 1111,
      },
      table:[
      ],
      maxPage:'',

    };
  },
  methods: {
    lastPage() {
       if (this.page - 1 > 0) {
        this.page -= 1;
       }
      //last page
      //get 寫法
      this.axios.get('http://127.0.0.1:9000/nn/history', {
        params: {
          //get 參數放這裡
          CustomerID: this.CustomerID,
          page: this.page,
        }
      })
      .then(response=> {//  get 回來的 資料 處理
        let res = JSON.stringify(response.data); // 先變字串
        let resobj = JSON.parse(res) // 再變 object
        this.table = resobj
        // 就可以做其他處理 像存到data 裡面
        // Date and Oid
        this.order.Date = resobj.data[0].Time.split(' ')[0];
        this.order.Oid = resobj.data[0].HistoryID;
        this.order.Price = resobj.data[0].TotalPrice;
        // table data
        this.table = resobj.data[0].PurchaseHistory;

      })
      .catch(error => {
        console.log(error);
      })
      .then(function () {
        // always executed
      })
      //---------
      console.log("last page");
    },
    nextPage() {
     if (this.page + 1 <= this.maxPage) { // where can get the limit of page
        this.page += 1;
       }
      //next pagegti
      //get 寫法
      this.axios.get('http://127.0.0.1:9000/nn/history', {
        params: {
          //get 參數放這裡
          CustomerID: this.CustomerID,
          page: this.page,
        }
      })
      .then(response=> {//  get 回來的 資料 處理
        let res = JSON.stringify(response.data); // 先變字串
        let resobj = JSON.parse(res) // 再變 object
        this.table = resobj
        // 就可以做其他處理 像存到data 裡面
        // Date and Oid
        this.order.Date = resobj.data[0].Time.split(' ')[0];
        this.order.Oid = resobj.data[0].HistoryID;
        this.order.Price = resobj.data[0].TotalPrice;
        // table data
        this.table = resobj.data[0].PurchaseHistory;
      })
      .catch(error => {
        console.log(error);
      })
      .then(function () {
        // always executed
      })
      //---------
      console.log("next page");
    },

  },
  created(){
      this.axios.get('http://127.0.0.1:9000/nn/getHistoryNum', {
        params: {
          //get 參數放這裡
          CustomerID: this.CustomerID,
        }
      })
      .then(response=> {//  get 回來的 資料 處理
        let res = JSON.stringify(response.data); // 先變字串
        let resobj = JSON.parse(res); // 再變 object
        this.table = resobj;
        // 就可以做其他處理 像存到data 裡面
        this.maxPage = resobj;
        console.log("Max page",this.maxPage);
        })
      .catch(error => {
        console.log(error);
      })
      .then(function () {
        // always executed
      })
      //---------

    this.page=1;
    //get 寫法
      this.axios.get('http://127.0.0.1:9000/nn/history', {
        params: {
          //get 參數放這裡
          CustomerID: this.CustomerID,
          page: this.page,
        }
      })
      .then(response=> {//  get 回來的 資料 處理
        let res = JSON.stringify(response.data); // 先變字串
        let resobj = JSON.parse(res) // 再變 object
        this.table = resobj
        // 就可以做其他處理 像存到data 裡面
        // Date and Oid
        this.order.Date = resobj.data[0].Time.split(' ')[0];
        this.order.Oid = resobj.data[0].HistoryID;
        this.order.Price = resobj.data[0].TotalPrice;
        // table data
        this.table = resobj.data[0].PurchaseHistory;
      })
      .catch(error => {
        console.log(error);
      })
      .then(function () {
        // always executed
      })
      //---------
      console.log("created")
  },
};
</script>

<style>
.pageBox {
  padding: 10px;
}
</style>
