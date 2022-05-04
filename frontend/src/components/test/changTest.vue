<template>

  <h1>Order History</h1>
  <input type="button" @click="add()" />

  <div class="table">
    <el-table :data="curPage" style="width: 100%">
    
        <el-table-column  prop="oid" label="Order ID"  align="center" />
        <el-table-column  prop="time" label="Time"  align="center" />
        <el-table-column  prop="product" label="Product"  align="center" />
        <el-table-column  prop="number" label="Number"  align="center" />
        <el-table-column prop="supplier" label="Supplier" align="center" />
    
    </el-table>
  </div>

  <div class="block">
    <el-pagination layout="prev, pager, next" :total="this.tableData.length" @current-change="setpage" :page-size="pageSize"> </el-pagination>
  </div>

</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          oid: '0',
          time: '2021',
          product: 'test',
          number: '1',
          supplier:'jojo'
        },
      ],
      page:1,
      pageSize:5,
    }
  },
  computed:{
    curPage(){
      return this.tableData.slice(this.pageSize*this.page-this.pageSize,this.pageSize*this.page)
    }
  },
  methods:{
    add(){
      this.tableData.push({
        oid: '0',
        time: '2021',
        product: 'test',
        number: '1',
        supplier:'jojo'
      },)
    },
    setpage(val){
      console.log(val)
      this.page=val
    }
  }
}
</script>


<style>
.el-table-column{
  left:0;
  right:0;
}
h1{
  color: brown;
  /*
  position:absolute;
  top:0;
  bottom:0;
  left: 0;
  right: 0;
  margin: auto;
  */
}
</style>