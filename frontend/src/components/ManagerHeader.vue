<template lang="">
  <el-container>
    <el-button @click="signOut">logout</el-button>
    <el-button @click="toOrderHistory">Order History</el-button> 
    <el-button @click="toTradeHistory">Trade History</el-button>
    <el-button @click="toOrder">Order</el-button>
    <el-button @click="toShop">Shop</el-button>
    <el-button @click="toRevenue">Revenue</el-button>  
  </el-container>
</template>
<script>
//import firebase from "firebase/compat/app";
//import "firebase/auth";


export default {
  components:{

  },
  methods: {
    toOrderHistory() {
      this.$router.push({path:"orderHistory"})
    },
    toTradeHistory() {
      this.$router.push({path:"tradeHistory"})
    },
    toOrder() {
      this.$router.push({path: "order"})
    },
    toShop(){
        this.$router.push({path: "shop"})
    },
    toRevenue(){
        this.$router.push({ path: "revenue"})
    },
    signOut() {
      this.firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "Home" });
          console.log(this.firebase.auth().currentUser)
        });
    },
    
  }
}
</script>
<style lang="">
  
</style>