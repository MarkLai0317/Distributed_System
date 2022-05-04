<template>
  <div>
    <h1>Customer Login</h1>
    <form @submit.prevent="pressed">
      <div class="login">
        <input type="text" placeholder="login" v-model="email" />
      </div>
      <div class="password">
        <input type="password" placeholder="password" v-model="password" />
      </div>
      <button class="loginButton">Login</button>
    </form>
    <div class="error" v-if="error">{{error.message}}</div>
    <h3>Don't have an account?</h3>
    <el-button @click="toRegister">Register</el-button>
  </div>
</template>

<script>
//import firebase from "firebase/compat/app";
//import "firebase/auth";
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    toRegister(){
      this.$router.push({ name: 'CustomerRegister'})
    },
    pressed() {
      this.firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          console.log(data);
          this.$router.replace({ name: 'Buy' });

          // 取email 用法
          console.log('this is email: ',this.firebase.auth().currentUser.email)
        })
        .catch(error => {
          this.error = error;
          //console.log(error)
          this.wrongPassword()
        });
    },
    wrongPassword(){
      ElMessage.error('wrong password or email')
    }
  }
};
</script>

<style  scoped>
div {
  color: inherit;
}
input {
  width: 400px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
}
.loginButton {
  width: 400px;
  height: 75px;
  font-size: 100%;
}
.error {
  color: red;
}
</style>