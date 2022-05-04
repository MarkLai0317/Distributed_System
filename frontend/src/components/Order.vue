<template>
  <div >
    <el-select
      v-model="currentHouse"
      placeholder="Select Store House"
      @change="selectHouse"
    >
      <el-option
        v-for="item in StoreHouses"
        :key="item.StoreHouseID"
        :label="item.StoreHouseID"
        :value="item.StoreHouseID"
      >
      </el-option>
    </el-select>
    <p />
    <el-table :data="currentPage" style="margin-left: 30%; width: 100%">
      <el-table-column fixed prop="Name" label="Product" width="150" />
      <el-table-column prop="SupplierID" label="Supplier" width="150" />
      <!-- -->
      <el-table-column prop="Type" label="Type" width="150" />
      <!--
    <el-table-column>
      <template #default="scope">
        <el-input>
          size="mini"
          v-model="number"
          @change="pressOrder(scope.$index, scope.row)">Order</el-input>
      </template>
    </el-table-column> 
    -->
      <el-table-column label="Number" width="160">
        <template #default="scope">
          <el-input-number
            v-model="scope.row.number"
            size="mini"
            :min="1"
            @change="changeNumber(scope.$index, scope.row)"
          ></el-input-number>
        </template>
      </el-table-column>
      <!-- -->
      <el-table-column label="Order" width="80">
        <template #default="scope">
          <el-button size="mini" :disabled="this.currentHouse=='Select House'" @click="pressOrder(scope.$index, scope.row)"
            >Order</el-button
          >
        </template>
      </el-table-column>
      <!-- -->
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="this.productTable.length"
      @current-change="setPage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //number: 5,//should be dynamic and different from others
      page: 1,
      pageSize: 5,
      productTable: [],
      StoreHouses: [],
      currentHouse: 'Select House',
      ManagerID: this.firebase.auth().currentUser.email,
    };
  },
  methods: {
    changeNumber(index, row) {
      console.log(index);
      console.log(row);
      console.log(this.productTable[index]);
    },
    selectHouse(val) {
      this.currentHouse = val;
    },
    getStoreHouse(mid) {
      this.axios
        .get("http://127.0.0.1:9000/ni/GetStoreHouseID", {
          params: {
            ManagerID: mid,
          },
        })
        .then((response) => {
          //  get 回來的 資料 處理
          let res = JSON.stringify(response.data); // 先變字串
          let resobj = JSON.parse(res); // 再變 object
          // 就可以做其他處理 像存到data 裡面
          // Date and Oid
          console.log("storehouse", resobj);
          return resobj;
        })
        .catch((error) => {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      //---------
    },
    ///////////
    pressOrder(index, row) {
      console.log(index);
      console.log(row);
      //------------------------
      let ShopManagerID = this.ManagerID;
      let StoreHouseID = this.currentHouse;
      let ProductSupplierID = row.SupplierID;
      let ProductID = row.ProductID;
      let Num = row.number;

      let data = {
        StoreHouseID: StoreHouseID,
        ShopManagerID: ShopManagerID,
        ProductSupplierID: ProductSupplierID,
        ProductID: ProductID,
        Num: Num,
      };
      console.log("ADD", data);

      //post 寫法
      this.axios
        .post("http://127.0.0.1:9000/nn/orderButton", {
          // post 參數放這裡
          StoreHouseID: StoreHouseID,
          ShopManagerID: ShopManagerID,
          ProductSupplierID: ProductSupplierID,
          ProductID: ProductID,
          Num: Num,
        })
        .catch((error) => {
          console.log(error);
          this.error = "errorl";
          console.log("order error");
        })
        .then(function () {
          row.number = 0;
        });
      //------------------------
    },
    ////////
    setPage(val) {
      console.log(val);
      this.page = val;
    },
  },
  computed: {
    currentPage() {
      return this.productTable.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page
      );
    },
  },
  created() {
    //get all product
    this.axios
      .get("http://127.0.0.1:9000/ni/Order", {
        params: {
          // no params
        },
      })
      .then((response) => {
        //  get 回來的 資料 處理
        let res = JSON.stringify(response.data); // 先變字串
        let resobj = JSON.parse(res); // 再變 object
        // 就可以做其他處理 像存到data 裡面
        // Date and Oid
        //console.log(resobj.data);
        this.productTable = resobj.data;
        for (let i = 0; i < this.productTable.length; i++) {
          this.productTable[i].number = 0;
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    //---------
    this.axios
      .get("http://127.0.0.1:9000/ni/GetStoreHouseID", {
        params: {
          ManagerID: this.firebase.auth().currentUser.email,
        },
      })
      .then((response) => {
        //  get 回來的 資料 處理
        let res = JSON.stringify(response.data); // 先變字串
        let resobj = JSON.parse(res); // 再變 object
        // 就可以做其他處理 像存到data 裡面
        // Date and Oid
        this.StoreHouses = resobj.data;
        console.log("storehouse", this.StoreHouses);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  },
};
</script>
<style >

</style>
