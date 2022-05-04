<template>
  <div>
    <el-button @click="toCustomerLogin" >Customer</el-button>
    <el-button @click="toManagerLogin">Manager</el-button>
  </div>
</template>

<script>

export default {
  components: {

  },
  methods: {
    toCustomerLogin(){
      this.$router.push({name:"CustomerLogin"}) 
    },
    toManagerLogin(){
      this.$router.push({name:"ManagerLogin"}) 
    },
  }
  
}
</script>
