<template lang="">
  <el-container>
    <el-button @click="signOut">logout</el-button>
    <el-button @click="toBuy">Products</el-button> 
    <el-button @click="toCart">Cart</el-button>
    <el-button @click="toHistory">History</el-button> 
  </el-container>
</template>
<script>
//import firebase from "firebase/compat/app";
//import "firebase/auth";


export default {
  components:{

  },
  methods: {
    toBuy() {
      this.$router.push({path:"buy"})
    },
    toCart() {
      this.$router.push({path:"cart"})
    },
    toHistory() {
      this.$router.push({path: "history"})
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