<template>
  <div>
    <div class="error" v-if="error">{{error.message}}</div>
    <form @submit.prevent="pressed">
      Register
      <div class="email">
        <input type="email" v-model="email" placeholder="email" />
      </div>
      <div class="user name">
        <input type="name" v-model="name" placeholder="name" />
      </div>
      <div class="password">
        <input type="password" v-model="password" placeholder="password" />
        <div class="error" v-if="passwordNotConsistent">password not consistent</div>
      </div>
      <div class="password">
        <input type="password" v-model="passwordConfirm" placeholder="password confirm" />
      </div>
      <div class="phoneNumber">
        <input type="phone Number" placeholder="phoneNumber" v-model="phoneNumber"/>
      </div>
      <div class="shopName">
        <input placeholder="Shop Name" v-model="shopName"/>
      </div>
      <div class="error" v-if="error">{{error}}</div>
      <button type="submit"  :disabled="registerDisable">Register</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/auth";

export default {
  data() {
    
    return {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
      phoneNumber: "",
      shopName: "",
      error: "",
      
    }
  },
  computed:{
    registerDisable(){
      return !(this.password == this.passwordConfirm) || this.password == '' || this.email == ''
              || this.phoneNumber == '' || this.phoneNumber.length != 10 || !(/^\d+$/.test(this.phoneNumber))
              || this.name == '' 
    },
    passwordNotConsistent(){
      return !(this.password == this.passwordConfirm)
    }
  },
  methods: {
    pressed() {
      
      this.checkExist()
    },
    addToDatabase() {
      this.axios.post('http://127.0.0.1:9000/mark/register/Manager', {
          Email: this.email,
          Name: this.name, 
          PhoneNum: this.phoneNumber, 
          ShopName: this.ShopName
        
      })
      .then(response=>{
        console.log(response)
      })
      .catch(error=>{
        console.log(error)
      })
    },
    checkExist(){
      
      return this.axios.get('http://127.0.0.1:9000/mark/existManager',{
        params: {
          //get 參數放這裡
          email: this.email,
        }
      })
      .then(response=> {//  get 回來的 資料 處理
        let res = JSON.stringify(response.data); // 先變字串
        let resobj = JSON.parse(res) // 再變 object
        
        // 就可以做其他處理 像存到data 裡面
        //console.log(resobj.exist)
        if(!resobj.exist){
          this.addToDatabase()
          firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            console.log("here");
            this.$router.replace({ name: "ManagerHome" });
          })
          .catch(error => (this.error = error));
        }else{
          this.error = 'email exist'
        }
      })
      .catch(error => {
        console.log(error);
      })
      .then(function () {
        // always executed
      })
    }
  }
};
</script>

<style  scoped>
.error {
  color: red;
  font-size: 18px;
}
input {
  width: 400px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
}
button {
  width: 400px;
  height: 75px;
  font-size: 100%;
}
</style>