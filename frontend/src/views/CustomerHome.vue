<template>
  <el-container style="height: 1000px; border: 1px solid #eee">
    
    <el-container>
      <el-header style="font-size: 30px; text-align: left">
        <CustomerHeader></CustomerHeader>
      </el-header>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import CustomerHeader from '../components/CustomerHeader'
  //import ajax from 'vuejs-ajax'
export default {
  created(){
    this.getSensorsData()
  },
  components:{
    CustomerHeader,
   
  },
  methods:{
    getSensorsData() {
       this.axios({
         methos: 'get',
         url: 'http://52.197.39.218:8080/sensordata'
       }).then(res=>{
         console.log(JSON.stringify(res.data))
       })
    }
  }
}
</script>
<style lang="">
  
</style>
